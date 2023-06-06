import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ElasticEnum } from '.';

export class ElasticIndexDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  indexName: string;

  @IsEnum(ElasticEnum)
  @IsNotEmpty()
  @ApiProperty({
    enum: ElasticEnum,
  })
  operation: ElasticEnum;
}
