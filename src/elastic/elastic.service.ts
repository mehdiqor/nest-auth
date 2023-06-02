import { Injectable } from '@nestjs/common';
import {
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { SearchDto } from './dto';

@Injectable()
export class ElasticService {
  async wordSearch(dto: SearchDto) {
    const address = 'word-search';

    const result = this.sendData(address, dto);
    return result;
  }

  async regexpSearch(dto: SearchDto) {
    const address = 'regexp-search';

    const result = this.sendData(address, dto);
    return result;
  }

  async movieSearch(search: string) {
    const address = 'movie-search';

    const result = this.sendData(address, search);
    return result;
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
