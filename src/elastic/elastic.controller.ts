import {
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { ElasticService } from './elastic.service';
import { SearchDto } from './dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Elastic-Search')
@Controller('elastic')
export class ElasticController {
  constructor(
    private readonly elasticService: ElasticService,
  ) {}

  @Post('word-search')
  @ApiConsumes('application/x-www-form-urlencoded')
  wordSearch(@Body() dto: SearchDto) {
    return this.elasticService.wordSearch(dto);
  }

  @Post('regexp-search')
  @ApiConsumes('application/x-www-form-urlencoded')
  regexpSearch(@Body() dto: SearchDto) {
    return this.elasticService.regexpSearch(dto);
  }

  @Get('movie-search')
  movieSearch(@Query('search') search: string) {
    return this.elasticService.movieSearch(search);
  }
}
