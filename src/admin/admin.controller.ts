import {
  Controller,
  Body,
  Post,
  Get,
  Query,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { ElasticIndexDto } from './dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('elastic-index')
  @ApiConsumes('application/x-www-form-urlencoded')
  elasticIndex(@Body() dto: ElasticIndexDto) {
    return this.adminService.elasticIndex(dto);
  }

  @Get('get-musics')
  getAllMusics(@Query('message') message: string) {
    return this.adminService.getAllMusics(message);
  }

  @Get('get-films')
  getAllFilms(@Query('message') message: string) {
    return this.adminService.getAllFilms(message);
  }

  @Get('get-films')
  getAllElasticData(@Query('index') index: string) {
    return this.adminService.getAllElasticData(index);
  }
}
