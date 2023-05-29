import { Injectable } from '@nestjs/common';
import {
  AddAlbumDto,
  AddArtistDto,
  AddTrackDto,
  UpdateAlbumDto,
  UpdateArtistDto,
  UpdateTrackDto,
} from './dto';

@Injectable()
export class MusicService {
  constructor() {}

  async addArtist(dto: AddArtistDto) {}
  async updateArtistById(
    id: string,
    dto: UpdateArtistDto,
  ) {}
  async removeArtistByName(artistName: string) {}
  async addAlbum(dto: AddAlbumDto) {}
  async updateAlbumById(dto: UpdateAlbumDto) {}
  async removeAlbumById(id: string) {}
  async addTrack(dto: AddTrackDto) {}
  async updateTrack(dto: UpdateTrackDto) {}
  async removeTrack(trackName: string, albumName: string) {}
}
