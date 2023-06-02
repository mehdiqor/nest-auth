import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  index: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  search: string;
}
