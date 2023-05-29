import { Injectable } from '@nestjs/common';
import {
  AddAlbumDto,
  AddArtistDto,
  AddTrackDto,
  UpdateAlbumDto,
  UpdateArtistDto,
  UpdateTrackDto,
} from './dto';
import {
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class MusicService {
  constructor() {}

  async addArtist(dto: AddArtistDto) {
    const address = 'add-artist';
    const result = this.sendData(address, dto);

    return result;
  }

  async updateArtistById(id: string, dto: UpdateArtistDto) {
    const address = 'update-artist';
    const data = {
      id,
      artistName: dto.artistName,
    };

    const result = this.sendData(address, data);
    return result;
  }

  async removeArtistByName(artistName: string) {
    const address = 'remove-artist';
    const result = this.sendData(address, artistName);

    return result;
  }

  async addAlbum(dto: AddAlbumDto) {
    const address = 'add-album';
    const result = this.sendData(address, dto);

    return result;
  }

  async updateAlbumById(dto: UpdateAlbumDto) {
    const address = 'update-album';
    const result = this.sendData(address, dto);

    return result;
  }

  async removeAlbumById(id: string) {
    const address = 'remove-album';
    const result = this.sendData(address, id);

    return result;
  }

  async addTrack(dto: AddTrackDto) {
    const address = 'add-track';
    const result = this.sendData(address, dto);

    return result;
  }

  async updateTrack(dto: UpdateTrackDto) {
    const address = 'update-track';
    const result = this.sendData(address, dto);

    return result;
  }

  async removeTrack(trackName: string, albumName: string) {
    const address = 'remove-track';
    const data = {
      trackName,
      albumName
    }

    const result = this.sendData(address, data);
    return result;
  }

  sendData(address: string, data) {
    const authMicroservice = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5673'],
        queue: 'auth_queue',
      },
    });

    const result = authMicroservice.send(address, data);

    return result;
  }
}
