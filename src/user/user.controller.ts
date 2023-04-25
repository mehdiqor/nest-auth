import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth('Token-Please')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @ApiOkResponse({
    description:
      'The resource was returned successfully',
  })
  @ApiForbiddenResponse({
    description: 'Unauthorized Request',
  })
  @ApiNotFoundResponse({
    description: 'Resource not found',
  })
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch('edit')
  @ApiOkResponse({
    description:
      'The resource was updated successfully',
  })
  @ApiNotFoundResponse({
    description: 'Resource not found',
  })
  @ApiForbiddenResponse({
    description: 'Unauthorized Request',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Bad Request',
  })
  editUser(
    @GetUser('id') userId: number,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUser(userId, dto);
  }
}
