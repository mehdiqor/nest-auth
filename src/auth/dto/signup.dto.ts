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
  @ApiProperty({
    type: String,
  })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  // @ApiProperty({
  //   type: String,
  // })
  // @IsString()
  // @IsNotEmpty()
  // password_confirm: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  @MaxLength(10)
  firstName?: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  @MaxLength(10)
  lastName?: string;
}
