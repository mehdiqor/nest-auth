import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class TfaDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
