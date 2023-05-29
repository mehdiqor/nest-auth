import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignupDto,
  SigninDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  TfaDto,
} from './dto';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { JwtGuard } from './guard';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('signup')
  @ApiConsumes('application/x-www-form-urlencoded')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @ApiConsumes('application/x-www-form-urlencoded')
  signin(
    @Body() dto: SigninDto,
    @Res({ passthrough: true })
    response: Response,
  ) {
    return this.authService.signin(dto, response);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  @ApiConsumes('application/x-www-form-urlencoded')
  refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true })
    response: Response,
  ) {
    return this.authService.refreshToken(request, response);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signout')
  @ApiConsumes('application/x-www-form-urlencoded')
  signout(
    @Req() request: Request,
    @Res({ passthrough: true })
    response: Response,
  ) {
    return this.authService.signout(request, response);
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  @ApiConsumes('application/x-www-form-urlencoded')
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  @ApiConsumes('application/x-www-form-urlencoded')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('google-auth')
  @ApiConsumes('application/x-www-form-urlencoded')
  googleAuth(
    @Body('gtoken') gtoken: string,
    @Res({ passthrough: true })
    response: Response,
  ) {
    return this.authService.googleAuth(gtoken, response);
  }

  @HttpCode(HttpStatus.OK)
  @Post('2fa/generate')
  @ApiConsumes('application/x-www-form-urlencoded')
  generateTfa(@Body() dto: SigninDto) {
    return this.authService.generateTfa(dto);
  }

  @Post('2fa/turn-on')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiConsumes('application/x-www-form-urlencoded')
  async turnOnTfa(@Body() dto: TfaDto) {
    await this.authService.isTfaCodeValid(dto);
    await this.userService.turnOnTfa(dto);

    return {
      message: 'Two Factor Authentication is enabled!',
    };
  }

  @Post('2fa/turn-off')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiConsumes('application/x-www-form-urlencoded')
  async turnOffTfa(@Body() dto: TfaDto) {
    await this.authService.isTfaCodeValid(dto);
    await this.userService.turnOffTfa(dto);

    return {
      message: 'Two Factor Authentication is disabled!',
    };
  }

  @HttpCode(200)
  @Post('2fa/login')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiConsumes('application/x-www-form-urlencoded')
  async loginWithTfa(
    @Body() dto: TfaDto,
    @Res({ passthrough: true })
    response: Response,
  ) {
    await this.authService.isTfaCodeValid(dto);
    return this.authService.loginWith2fa(dto, response);
  }
}
