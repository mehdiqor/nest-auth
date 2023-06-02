import {
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Spotify')
@Controller('spotify')
export class SpotifyController {
  constructor(private spotifyService: SpotifyService) {}

  @Post('getToken')
  getToken() {
    return this.spotifyService.getToken();
  }

  @Get('artist-id')
  getArtistById(@Query('id') id: string) {
    return this.spotifyService.getArtistById(id);
  }

  @Get('artist-name')
  getArtistByName(@Query('name') name: string) {
    return this.spotifyService.getArtistByName(name);
  }
}
