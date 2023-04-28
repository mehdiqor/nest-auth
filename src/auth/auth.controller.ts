import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignupDto,
  SigninDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './dto';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(
    @Body() dto: SigninDto,
    @Res({ passthrough: true })
    response: Response,
  ) {
    return this.authService.signin(dto, response);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(
    @Req() request: Request,
    @Res({ passthrough: true })
    response: Response,
  ) {
    return this.authService.refreshToken(
      request,
      response,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('signout')
  signout(
    @Req() request: Request,
    @Res({ passthrough: true })
    response: Response,
  ) {
    return this.authService.signout(
      request,
      response,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgot')
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }
}
