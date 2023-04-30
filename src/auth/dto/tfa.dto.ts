import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class TfaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  code: string;
}
