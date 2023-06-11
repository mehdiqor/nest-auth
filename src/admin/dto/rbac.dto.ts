import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { RolesEnum } from 'src/utils';

export class AssignRoleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsEnum(RolesEnum)
  @IsNotEmpty()
  @ApiProperty({
    enum: RolesEnum,
  })
  role: RolesEnum;
}
