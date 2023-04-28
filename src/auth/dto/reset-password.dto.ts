import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  token: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({
    type: String,
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  password_confirm: string;
}
