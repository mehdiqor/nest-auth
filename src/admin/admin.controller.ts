import { Controller, Body, Post } from '@nestjs/common';
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
}
