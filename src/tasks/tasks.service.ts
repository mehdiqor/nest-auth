import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateTaskDto,
  EditTaskDto,
} from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(
    userId: number,
    dto: CreateTaskDto,
  ) {
    // const task = await this.prisma.task.create({
    //   data: {
    //     userId,
    //     ...dto,
    //   },
    // });
    // if (!task)
    //   throw new InternalServerErrorException();
    // return task;
    return {
      msg: 'this is your ID and DATA',
      userId,
      dto,
    };
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

    // check if user owns the task
    if (task.userId !== userId)
      throw new ForbiddenException(
        'Access to resource denied',
      );

    // check task exist
    if (!task) throw new NotFoundException();
    return task;
  }

  async updateTaskStatus(
    userId: number,
    taskId: number,
    dto: EditTaskDto,
  ) {
    // check exist task
    await this.getTaskById(userId, taskId);

    // update task
    // const task = await this.prisma.task.update({
    //   where: {
    //     id: taskId,
    //   },
    //   data: {
    //     ...dto,
    //   },
    // });
    // if (!task)
    //   throw new InternalServerErrorException();
    // return task;
    return {
      msg: 'this is your ID, Task ID and DATA',
      userId,
      taskId,
      dto,
    };
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
  }
}
