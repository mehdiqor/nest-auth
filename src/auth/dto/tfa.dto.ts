import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class TfaDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  code: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    type: String,
  })
  tfSecret?: string;
}
