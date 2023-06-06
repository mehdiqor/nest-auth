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

  async getAllMusics(message: string) {
    const musicData = await new Promise((resolve) => {
      this.eventEmitter.emit(
        'admin.musicData',
        message,
        resolve,
      );
    });

    return musicData;
  }

  async getAllFilms(message: string) {
    const filmData = await new Promise((resolve) => {
      this.eventEmitter.emit(
        'admin.filmData',
        message,
        resolve,
      );
    });

    return filmData;
  }

  async getAllElasticData(index: string) {
    const filmData = await new Promise((resolve) => {
      this.eventEmitter.emit(
        'admin.elasticData',
        index,
        resolve,
      );
    });

    return filmData;
  }
}
