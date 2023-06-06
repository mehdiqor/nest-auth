import { Injectable } from '@nestjs/common';
import {
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { SearchDto } from './dto';
import { OnEvent } from '@nestjs/event-emitter';
import { ElasticIndexDto } from 'src/admin/dto';

@Injectable()
export class ElasticService {
  wordSearch(dto: SearchDto) {
    const address = 'word-search';

    const result = this.sendData(address, dto);
    return result;
  }

  regexpSearch(dto: SearchDto) {
    const address = 'regexp-search';

    const result = this.sendData(address, dto);
    return result;
  }

  movieSearch(search: string) {
    const address = 'movie-search';

    const result = this.sendData(address, search);
    return result;
  }

  // Create - Check Exist - Remove Index
  @OnEvent('admin.indexCrud')
  indexCrud(
    dto: ElasticIndexDto,
    resolve: (albums: any) => void,
  ) {
    const address = `${dto.operation}-index`;
    const result = this.sendData(address, dto.indexName);

    resolve(result);
  }

  sendData(address: string, data) {
    const authMicroservice = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5675'],
        queue: 'elastic_queue',
      },
    });

    const result = authMicroservice.send(address, data);

    return result;
  }
}
