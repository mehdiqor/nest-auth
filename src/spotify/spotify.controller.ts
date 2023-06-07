import {
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';

@ApiTags('Spotify')
@ApiBearerAuth()
@UseGuards(JwtGuard)
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
