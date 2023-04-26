import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class EditBookmarkDto {
  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(10)
  @ApiProperty({
    required: false,
    type: String,
  })
  title?: string;

  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    required: false,
    type: String,
  })
  description?: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty({
    required: false,
    type: String,
  })
  link?: string;
}
