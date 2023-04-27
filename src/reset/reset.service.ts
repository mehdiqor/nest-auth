import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
