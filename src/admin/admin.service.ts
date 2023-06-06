import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ElasticIndexDto } from './dto';

@Injectable()
export class AdminService {
  constructor(private eventEmitter: EventEmitter2) {}

  async elasticIndex(dto: ElasticIndexDto) {
    const result = await new Promise((resolve) => {
      this.eventEmitter.emit(
        'admin.indexCrud',
        dto,
        resolve,
      );
    });

    return result;
  }
}
