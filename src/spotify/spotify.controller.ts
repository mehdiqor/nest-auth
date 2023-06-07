import {
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { Roles } from 'src/auth/decorator';
import { RolesEnum } from 'src/auth/dto';

@ApiTags('Spotify')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('spotify')
export class SpotifyController {
  constructor(private spotifyService: SpotifyService) {}

  @Post('getToken')
  @Roles(RolesEnum.USER)
  getToken() {
    return this.spotifyService.getToken();
  }

  @Get('artist-id')
  @Roles(RolesEnum.USER)
  getArtistById(@Query('id') id: string) {
    return this.spotifyService.getArtistById(id);
  }

  @Get('artist-name')
  @Roles(RolesEnum.USER)
  getArtistByName(@Query('name') name: string) {
    return this.spotifyService.getArtistByName(name);
  }
}
