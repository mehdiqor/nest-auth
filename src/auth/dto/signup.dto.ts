import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password_confirm: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  @ApiProperty({ required: false })
  firstName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  @ApiProperty({ required: false })
  lastName?: string;
}
