import {
  Controller,
  Body,
  Post,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { ElasticIndexDto } from './dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { Roles } from 'src/auth/decorator';
import { RolesEnum } from 'src/auth/dto';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(JwtGuard, RolesGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('elastic-index')
  @Roles(RolesEnum.ADMIN)
  @ApiConsumes('application/x-www-form-urlencoded')
  elasticIndex(@Body() dto: ElasticIndexDto) {
    return this.adminService.elasticIndex(dto);
  }

  @Get('get-musics')
  @Roles(RolesEnum.ADMIN)
  getAllMusics(@Query('message') message: string) {
    return this.adminService.getAllMusics(message);
  }

  @Get('get-films')
  @Roles(RolesEnum.ADMIN)
  getAllFilms(@Query('message') message: string) {
    return this.adminService.getAllFilms(message);
  }

  @Get('get-elastic-data')
  @Roles(RolesEnum.ADMIN)
  getAllElasticData(@Query('index') index: string) {
    return this.adminService.getAllElasticData(index);
  }
}
