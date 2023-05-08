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
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsString()
  @IsNotEmpty()
  password_confirm: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  firstName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  lastName?: string;
}
