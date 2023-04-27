import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class ResetService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  async forgotPassword(email: string) {
    const token = Math.random()
      .toString(20)
      .substring(2, 12);

    await this.prisma.reset.create({
      data: {
        email,
        token,
      },
    });

    const url = `http://localhost:3000/reset/${token}`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset your Password',
      html: `Click <a href="${url}">here</a> to reset your password`,
    });

    return {
      message: 'Check your Email',
    };
  }

  async resetPassword(
    token: string,
    password: string,
    password_confirm,
  ) {
    if (password !== password_confirm)
      throw new BadRequestException(
        'Passwords do not match',
      );

    const reset =
      await this.prisma.reset.findFirst({
        where: {
          token,
        },
      });

    const user =
      await this.prisma.user.findUnique({
        where: {
          email: reset.email,
        },
      });

    if (!user) throw new NotFoundException();

    const hash = await argon.hash(password);
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
}
