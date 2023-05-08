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
  email?: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  username?: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  firstName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  lastName?: string;

  @IsStrongPassword()
  @IsOptional()
  password?: string;
}
