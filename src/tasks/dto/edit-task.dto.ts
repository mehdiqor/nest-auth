import {
  IsString,
  IsOptional,
} from 'class-validator';
import { Status } from './create-task.dto';

export class EditTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  status?: Status;
}
