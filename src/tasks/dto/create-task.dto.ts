import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(10)
  @ApiProperty({
    type: String,
  })
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  @ApiProperty({
    required: false,
    type: String,
  })
  description?: string;
}
