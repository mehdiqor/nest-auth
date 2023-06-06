import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class SearchDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  index: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  search?: string;
}
