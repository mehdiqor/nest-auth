import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class EditUserDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  email?: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  @ApiProperty({
    required: false,
  })
  username?: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  @ApiProperty({
    required: false,
  })
  firstName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  @ApiProperty({
    required: false,
  })
  lastName?: string;

  @IsStrongPassword()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  password?: string;
}
