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
  })
  title?: string;

  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    required: false,
  })
  description?: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  link?: string;
}
