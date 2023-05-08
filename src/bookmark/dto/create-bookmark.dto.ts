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
  title: string;

  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(20)
  description?: string;

  @IsUrl()
  @IsNotEmpty()
  link: string;
}
