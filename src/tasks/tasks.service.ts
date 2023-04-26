import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateTaskDto,
  UpdateTaskStatusDto,
} from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(
    userId: number,
    dto: CreateTaskDto,
  ) {
    const { title, description } = dto;
    const task = await this.prisma.task.create({
      data: {
        userId,
        title,
        description,
      },
    });
    if (!task)
      throw new InternalServerErrorException();
    return task;
  }

  async getUserTasks(userId: number) {
    const tasks = await this.prisma.task.findMany(
      {
        where: {
          userId,
        },
      },
    );
    return tasks;
  }

  async getTaskById(
    userId: number,
    taskId: number,
  ) {
    const task = await this.prisma.task.findFirst(
      {
        where: {
          id: taskId,
          userId,
        },
      },
    );

    // check task exist
    if (!task) throw new NotFoundException();
    return task;
  }

  async updateTaskStatus(
    userId: number,
    taskId: number,
    dto: UpdateTaskStatusDto,
  ) {
    // check exist task
    await this.getTaskById(userId, taskId);

    // update task
    const task = await this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        status: dto.status
      },
    });
    if (!task)
      throw new InternalServerErrorException();
    return task;
  }

  async deleteTaskById(
    userId: number,
    taskId: number,
  ) {
    // check exist task
    await this.getTaskById(userId, taskId);

    // delete task
    await this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    return { msg: 'removed' };
  }
}
