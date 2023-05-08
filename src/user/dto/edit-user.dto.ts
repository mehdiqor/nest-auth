import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class EditUserDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({
    required: false,
    type: String,
  })
  email?: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  @ApiProperty({
    required: false,
    type: String,
  })
  username?: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  @ApiProperty({
    required: false,
    type: String,
  })
  firstName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  @ApiProperty({
    required: false,
    type: String,
  })
  lastName?: string;
}
