import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsUrl,
} from 'class-validator';

export class CreateBookmarkDto {
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
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ required: false })
  description?: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  link: string;
}
