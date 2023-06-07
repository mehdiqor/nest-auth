import {
  Body,
  CacheTTL,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ElasticService } from './elastic.service';
import { SearchDto } from './dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  CacheInterceptor,
  CacheKey,
} from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@ApiTags('ElasticSearch')
@Controller('elastic')
export class ElasticController {
  constructor(
    private readonly elasticService: ElasticService,
  ) {}

  @CacheKey('findWord')
  @CacheTTL(60000)
  @Post('word-search')
  @ApiConsumes('application/x-www-form-urlencoded')
  wordSearch(@Body() dto: SearchDto) {
    return this.elasticService.wordSearch(dto);
  }

  @CacheKey('regexp')
  @CacheTTL(60000)
  @Post('regexp-search')
  @ApiConsumes('application/x-www-form-urlencoded')
  regexpSearch(@Body() dto: SearchDto) {
    return this.elasticService.regexpSearch(dto);
  }

  @CacheKey('findMovie')
  @CacheTTL(60000)
  @Get('movie-search')
  movieSearch(@Query('search') search: string) {
    return this.elasticService.movieSearch(search);
  }
}
