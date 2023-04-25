import {
  IsString,
  IsOptional,
} from 'class-validator';
import { Status } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';

export class EditTaskDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    type: String,
    description: 'This is a optional property',
  })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    type: String,
    description: 'This is a optional property',
  })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    type: String,
    description: 'This is a optional property',
  })
  status?: Status;
}
