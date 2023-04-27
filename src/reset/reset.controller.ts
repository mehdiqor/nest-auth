import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { ResetService } from './reset.service';

@ApiTags('Reset')
@ApiBearerAuth('Token-Please')
// @UseGuards(JwtGuard)
@Controller('reset')
export class ResetController {
  constructor(
    private resetService: ResetService,
  ) {}

  @Post('forgot')
  forgotPassword(@Body('email') email: string) {
    return this.resetService.forgotPassword(email);
  }
}
