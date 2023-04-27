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

      // const access_token = await this.jwt.signAsync(
      //   { id, email },
      //   { expiresIn: '30s', secret: secretJwt },
      // );

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

    const access_token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '30s',
        secret: secretJwt,
      },
    );
    const refresh_token =
      await this.jwt.signAsync(
        { id: userId },
        { secret: secretJwt },
      );
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

  async signout(response: Response) {
    response.clearCookie('refresh_token');

    return {
      message: 'Signed out Successfully',
    };
  }
}
