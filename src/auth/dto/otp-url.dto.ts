import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsUrl,
} from 'class-validator';

export class OtpUrlDto {
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  otpAuthUrl: string;
}
