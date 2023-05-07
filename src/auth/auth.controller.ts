import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignupDto,
  SigninDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  OtpUrlDto,
  TfaDto,
} from './dto';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { JwtGuard } from './guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

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
  refreshToken(
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

  @HttpCode(HttpStatus.OK)
  @Post('google-auth')
  googleAuth(
    @Body('gtoken') gtoken: string,
    @Res({ passthrough: true })
    response: Response,
  ) {
    return this.authService.googleAuth(
      gtoken,
      response,
    );
  }

  // @HttpCode(HttpStatus.OK)
  // @Post('2fa/:id')
  // twoFactor(
  //   @Param('id', ParseIntPipe) userId: number,
  //   @Body() dto: TfaDto,
  //   @Res({ passthrough: true })
  //   response: Response,
  // ) {
  //   return this.authService.twoFactor(
  //     userId,
  //     dto,
  //     response,
  //   );
  // }

  @HttpCode(HttpStatus.OK)
  @Post('2fa/generate')
  generateTfa(@Body() dto: SigninDto) {
    return this.authService.generateTfa(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('2fa/qrcode')
  generateQrCode(@Body() dto: OtpUrlDto) {
    return this.authService.generateQrCode(dto);
  }

  @Post('2fa/turn-on')
  @UseGuards(JwtGuard)
  async turnOnTfa(@Body() dto: TfaDto) {
    await this.authService.isTfaCodeValid(dto);
    await this.userService.turnOnTfa(dto);

    return {
      message:
        'Two Factor Authentication is enabled!',
    };
  }

  // @HttpCode(200)
  // @UseGuards(JwtGuard)
  // @Post('2fa/authenticate')
  // async authenticate(
  //   // @Request() request,
  //   @Body() body,
  //   @Res({ passthrough: true })
  //   response: Response,
  // ) {
  //   const isCodeValid =
  //     this.authService.isTfaCodeValid(
  //       body.tfaCode,
  //       request.user,
  //     );

  //   if (!isCodeValid) {
  //     throw new UnauthorizedException(
  //       'Wrong authentication code',
  //     );
  //   }

  //   return this.authService.loginWith2fa(
  //     request.user,
  //   );
  // }
}
