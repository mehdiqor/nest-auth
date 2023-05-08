import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class EditBookmarkDto {
  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(10)
  title?: string;

  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(20)
  description?: string;

  @IsUrl()
  @IsOptional()
  link?: string;
}
