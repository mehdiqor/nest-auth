import { Module } from '@nestjs/common';
import { ElasticController } from './elastic.controller';
import { ElasticService } from './elastic.service';

@Module({
  controllers: [ElasticController],
  providers: [ElasticService]
})
export class ElasticModule {}
