import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import { TfaDto } from 'src/auth/dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.hash;
    return user;
  }

  async setTfa(secret: string, userId: number) {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        tfaSecret: secret,
      },
    });
  }

  async turnOnTfa(dto: TfaDto) {
    await this.prisma.user.update({
      where: {
        email: dto.email,
      },
      data: {
        isTfaEnabled: true,
      },
    });
  }

  async turnOffTfa(dto: TfaDto) {
    await this.prisma.user.update({
      where: {
        email: dto.email,
      },
      data: {
        isTfaEnabled: false,
      },
    });
  }
}
