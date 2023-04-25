import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse({
    description: 'Signed Up Succesfully',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Bad Request',
  })
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @ApiCreatedResponse({
    description: 'Signed In Succesfully',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Bad Request',
  })
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
