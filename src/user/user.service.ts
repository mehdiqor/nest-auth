import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import { TfaDto } from 'src/auth/dto';
import { OnEvent } from '@nestjs/event-emitter';
import { AssignRoleDto } from 'src/admin/dto/rbac.dto';

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

  @OnEvent('admin.roleAssignment')
  async roleAssignment(
    dto: AssignRoleDto,
    resolve: (data: any) => void,
  ) {
    const { username, role } = dto;

    const result = await this.prisma.user.update({
      where: {
        username,
      },
      data: {
        role,
      },
    });

    resolve(result);
  }
}
