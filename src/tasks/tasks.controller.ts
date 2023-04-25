import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GetUser } from 'src/auth/decorator';
import { CreateTaskDto } from './dto';
import { EditTaskDto } from './dto/edit-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    private taskService: TasksService,
  ) {}
  @Post()
  createTask(
    @GetUser('id') userId: number,
    @Body() dto: CreateTaskDto,
  ) {
    return this.taskService.createTask(
      userId,
      dto,
    );
  }

  @Get()
  getUserTasks(@GetUser('id') userId: number) {
    return this.taskService.getUserTasks(userId);
  }

  @Get(':id')
  getTaskById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) taskId: number,
  ) {
    return this.taskService.getTaskById(
      userId,
      taskId,
    );
  }

  @Patch(':id')
  updateTaskStatus(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) taskId: number,
    @Body() dto: EditTaskDto,
  ) {
    return this.taskService.updateTaskStatus(
      userId,
      taskId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTaskById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) taskId: number,
  ) {
    return this.taskService.deleteTaskById(
      userId,
      taskId,
    );
  }
}
