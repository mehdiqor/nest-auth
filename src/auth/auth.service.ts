import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    try {
      // generate the password hash
      const hash = await argon.hash(dto.password);
      // save the new user
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      delete user.hash;
      return user;
    } catch (error) {
      if (
        error instanceof
        Prisma.PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto, response: Response) {
    // find user by email
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

    // if user does not exist throw exception
    if (!user)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    // compare password
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );
    // if passwordincorrect throw excepion
    if (!pwMatches)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    return this.signAccessToken(
      user.id,
      user.email,
      response,
    );
  }

  async refreshToken(
    request: Request,
    response: Response,
  ) {
    try {
      const secretJwt =
        this.config.get('JWT_SECRET');

      const refreshToken =
        request.cookies['refresh_token'];

      const { id, email } =
        await this.jwt.verifyAsync(refreshToken, {
          secret: secretJwt,
        });

      // check token exist
      const tokenEntity =
        await this.prisma.token.findFirst({
          where: {
            userId: id,
            expiredAt: { gt: new Date() },
          },
        });
      if (!tokenEntity)
        throw new UnauthorizedException();

      return this.signAccessToken(
        id,
        email,
        response,
      );
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async signAccessToken(
    userId: number,
    email: string,
    response: Response,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secretJwt =
      this.config.get('JWT_SECRET');

    // generate Atoken
    const access_token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '30s',
        secret: secretJwt,
      },
    );
    // generate Rtoken
    const refresh_token =
      await this.jwt.signAsync(
        { id: userId },
        { secret: secretJwt },
      );

    // save token in DB
    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + 7); // +7 days

    await this.prisma.token.create({
      data: {
        userId,
        token: refresh_token,
        expiredAt,
      },
    });

    // send Rtoken with cookies
    response.cookie(
      'refresh_token',
      refresh_token,
      {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 Week
      },
    );

    return {
      access_token,
    };
  }

  async signout(
    request: Request,
    response: Response,
  ) {
    // remove from DB
    const refreshToken =
      request.cookies['refresh_token'];
    const { id } =
      await this.prisma.token.findFirst({
        where: {
          token: refreshToken,
        },
      });
    await this.prisma.token.delete({
      where: {
        id,
      },
    });

    // remove from cookie
    response.clearCookie('refresh_token');

    return {
      message: 'Signed out Successfully',
    };
  }
}
