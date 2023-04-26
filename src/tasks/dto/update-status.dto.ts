import {
  IsString,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskStatusDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Choose Your Status',
    enum: {
      open: 'OPEN',
      progres: 'IN_PROGRES',
      done: 'DONE',
    },
  })
  status?: TaskStatus;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRES = 'IN_PROGRES',
  DONE = 'DONE',
}
