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
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GetUser } from 'src/auth/decorator';
import { CreateTaskDto } from './dto';
import { EditTaskDto } from './dto/edit-task.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';

@ApiTags('Task')
@ApiBearerAuth('Token-Please')
@UseGuards(JwtGuard)
@Controller('tasks')
export class TasksController {
  constructor(
    private taskService: TasksService,
  ) {}
  @Post()
  @ApiCreatedResponse({
    description: 'Created Succesfully',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Bad Request',
  })
  @ApiForbiddenResponse({
    description: 'Unauthorized Request',
  })
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
  @ApiOkResponse({
    description:
      'The resources were returned successfully',
  })
  @ApiForbiddenResponse({
    description: 'Unauthorized Request',
  })
  getUserTasks(@GetUser('id') userId: number) {
    return this.taskService.getUserTasks(userId);
  }

  @Get(':id')
  @ApiOkResponse({
    description:
      'The resource was returned successfully',
  })
  @ApiForbiddenResponse({
    description: 'Unauthorized Request',
  })
  @ApiNotFoundResponse({
    description: 'Resource not found',
  })
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
  @ApiOkResponse({
    description:
      'The resource was updated successfully',
  })
  @ApiNotFoundResponse({
    description: 'Resource not found',
  })
  @ApiForbiddenResponse({
    description: 'Unauthorized Request',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Bad Request',
  })
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
  @ApiOkResponse({
    description:
      'The resource was returned successfully',
  })
  @ApiForbiddenResponse({
    description: 'Unauthorized Request',
  })
  @ApiNotFoundResponse({
    description: 'Resource not found',
  })
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
