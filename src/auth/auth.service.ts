import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  SignupDto,
  SigninDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  TfaDto,
} from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { MailerService } from '@nestjs-modules/mailer';
import * as speakeasy from 'speakeasy';
import { OAuth2Client } from 'google-auth-library';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private mailerService: MailerService,
    private userService: UserService,
  ) {}

  async signup(dto: SignupDto) {
    try {
      if (dto.password !== dto.password_confirm)
        throw new BadRequestException(
          'Passwords do not match',
        );

      // generate the password hash
      const hash = await argon.hash(dto.password);

      // save the new user
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          hash,
        },
      });

      delete user.hash;
      delete user.tfaSecret;
      return user;
    } catch (error) {
      if (
        error instanceof
        Prisma.PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: SigninDto, response: Response) {
    const user = await this.findUser(dto.email);
    await this.checkPassword(user, dto);

    // check 2fa status
    if (user.isTfaEnabled)
      throw new BadRequestException(
        'you have to login with 2FA',
      );

    const token = await this.signAccessToken(
      user.id,
      user.email,
      response,
    );

    delete user.hash;
    delete user.tfaSecret;
    return {
      token,
      user,
    };
  }

  async refreshToken(request: Request, response: Response) {
    try {
      const secretJwt = this.config.get('JWT_SECRET');

      const refreshToken = request.cookies['refresh_token'];

      const { id, email } = await this.jwt.verifyAsync(
        refreshToken,
        {
          secret: secretJwt,
        },
      );

      // check token exist
      const tokenEntity = await this.prisma.token.findFirst(
        {
          where: {
            userId: id,
            expiredAt: { gt: new Date() },
          },
        },
      );
      if (!tokenEntity) throw new UnauthorizedException();

      return this.signAccessToken(id, email, response);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async signout(request: Request, response: Response) {
    // remove from DB
    const refreshToken = request.cookies['refresh_token'];
    const { id } = await this.prisma.token.findFirst({
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

  async forgotPassword(dto: ForgotPasswordDto) {
    // create forgot-pass data
    const token = Math.random()
      .toString(20)
      .substring(2, 12);

    await this.prisma.reset.create({
      data: {
        email: dto.email,
        token,
      },
    });

    // send Email
    const url = `http://localhost:3000/reset/${token}`;
    await this.mailerService.sendMail({
      to: dto.email,
      subject: 'Reset your Password',
      html: `Click <a href="${url}">here</a> to reset your password`,
    });

    return {
      message: 'Check your Email',
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    if (dto.password !== dto.password_confirm)
      throw new BadRequestException(
        'Passwords do not match',
      );

    // check exist user
    const reset = await this.prisma.reset.findFirst({
      where: {
        token: dto.token,
      },
    });

    const user = await this.findUser(reset.email);

    // update user pass
    const hash = await argon.hash(dto.password);
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        hash,
      },
    });

    return {
      message: 'Password Changed Successfully',
    };
  }

  async googleAuth(gtoken: string, response: Response) {
    const clientId = this.config.get('GOOGLE_ID');
    const client = new OAuth2Client(clientId);

    const ticket = await client.verifyIdToken({
      idToken: gtoken,
      audience: clientId,
    });

    const googleUser = ticket.getPayload();

    if (!googleUser) throw new UnauthorizedException();

    let user = await this.prisma.user.findUnique({
      where: {
        email: googleUser.email,
      },
    });

    const hash = await argon.hash(gtoken);

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          username: googleUser.name,
          firstName: googleUser.given_name,
          lastName: googleUser.family_name,
          email: googleUser.email,
          hash,
        },
      });
    }

    return this.signAccessToken(
      user.id,
      user.email,
      response,
    );
  }

  async generateTfa(dto: SigninDto) {
    // check user exist and compare password
    const user = await this.findUser(dto.email);
    await this.checkPassword(user, dto);

    const secret = speakeasy.generateSecret({
      name: `${user.username}'s NestCode`,
    });

    // save user's tfaSecret in DB
    await this.userService.setTfa(secret.base32, user.id);

    return {
      secret: secret.base32,
      link: secret.otpauth_url,
      message:
        'Copy this Url in QrCode generatore to get your QrCode',
    };
  }

  async loginWith2fa(dto: TfaDto, response: Response) {
    const user = await this.findUser(dto.email);

    const payload = {
      email: user.email,
      isTfaEnabled: !!user.isTfaEnabled,
      isTwoFactorAuthenticated: true,
    };

    const token = await this.signAccessToken(
      user.id,
      user.email,
      response,
    );

    delete user.hash;
    delete user.tfaSecret;
    return {
      token,
      user,
    };
  }

  async isTfaCodeValid(dto: TfaDto) {
    const { tfaSecret } = await this.findUser(dto.email);

    const isCodeValid = speakeasy.totp.verify({
      secret: tfaSecret,
      encoding: 'base32',
      token: dto.code,
    });

    if (!isCodeValid) {
      throw new UnauthorizedException(
        'Wrong authentication code',
      );
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
    const secretJwt = this.config.get('JWT_SECRET');

    // generate Atoken
    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: '5m',
      secret: secretJwt,
    });
    // generate Rtoken
    const refresh_token = await this.jwt.signAsync(
      { id: userId },
      { secret: secretJwt },
    );

    // save token in DB
    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + 7); // +7 days

    // check token exist
    const token = await this.prisma.token.findFirst({
      where: {
        userId,
      },
    });

    // if token exist, delete it from DB (clean DB from old tokens)
    if (token) {
      await this.prisma.token.deleteMany({
        where: {
          userId,
        },
      });
    }

    // save new token in DB
    await this.prisma.token.create({
      data: {
        userId,
        token: refresh_token,
        expiredAt,
      },
    });

    // send Rtoken with cookies
    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 Week
    });

    return {
      access_token,
    };
  }

  async findUser(email: string) {
    // find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    // if user does not exist throw exception
    if (!user)
      throw new ForbiddenException('Credentials incorrect');

    return user;
  }

  async checkPassword(user, dto) {
    // compare password
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );

    // // if passwordincorrect throw excepion
    if (!pwMatches)
      throw new ForbiddenException('Credentials incorrect');
  }
}
