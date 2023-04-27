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
@Controller('reset')
export class ResetController {
  constructor(
    private resetService: ResetService,
  ) {}

  @Post('forgot')
  forgotPassword(@Body('email') email: string) {
    return this.resetService.forgotPassword(
      email,
    );
  }

  @Post('change')
  resetPassword(
    @Body('token') token: string,
    @Body('password') password: string,
    @Body('password_confirm')
    password_confirm: string,
  ) {
    return this.resetService.resetPassword(
      token,
      password,
      password_confirm,
    );
  }
}
