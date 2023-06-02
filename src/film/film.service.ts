import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import {
  AddDirectorDto,
  AddMovieDto,
  UpdateDirectorDto,
  UpdateMovieDto,
} from './dto';

@Injectable()
export class FilmService {
  constructor(private config: ConfigService) {}

  async addDirector(dto: AddDirectorDto) {
    const address = 'add-director';

    const result = this.sendData(address, dto);
    return result;
  }

  async updateDirector(dto: UpdateDirectorDto) {
    const address = 'update-director';

    const result = this.sendData(address, dto);
    return result;
  }

  async removeDirector(id: string) {
    const address = 'remove-director';

    const result = this.sendData(address, id);
    return result;
  }

  async addMovie(
    dto: AddMovieDto,
    file: Express.Multer.File,
  ) {
    const address = 'add-movie';

    const result = this.sendData(address, dto);
    return result;
  }

  async updateMovie(dto: UpdateMovieDto) {
    const address = 'update-movie';

    const result = this.sendData(address, dto);
    return result;
  }

  async removeMovie(name: string, title: string) {
    const address = 'remove-movie';
    const data = { name, title };

    const result = this.sendData(address, data);
    return result;
  }

  sendData(address: string, data) {
    const authMicroservice = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5674'],
        queue: 'auth_queue',
      },
    });

    const result = authMicroservice.send(address, data);

    return result;
  }
}
