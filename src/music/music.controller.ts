import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MusicService } from './music.service';
import {
  AddAlbumDto,
  AddArtistDto,
  AddTrackDto,
  UpdateAlbumDto,
  UpdateArtistDto,
  UpdateTrackDto,
} from './dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Music')
@Controller('music')
export class MusicController {
  constructor(
    private readonly musicService: MusicService,
  ) {}
  @Post('add-artist')
  @ApiConsumes('application/x-www-form-urlencoded')
  addArtist(@Body() dto: AddArtistDto) {
    return this.musicService.addArtist(dto);
  }

  @Patch('update-artist')
  @ApiConsumes('application/x-www-form-urlencoded')
  updateArtistById(
    @Query('id') id: string,
    @Body() dto: UpdateArtistDto,
  ) {
    return this.musicService.updateArtistById(id, dto);
  }

  @Delete('remove-artist')
  removeArtistByName(
    @Query('artistName') artistName: string,
  ) {
    return this.musicService.removeArtistByName(artistName);
  }

  @ApiConsumes('application/x-www-form-urlencoded')
  @Post('add-album')
  addAlbum(@Body() dto: AddAlbumDto) {
    return this.musicService.addAlbum(dto);
  }

  @ApiConsumes('application/x-www-form-urlencoded')
  @Post('update-album')
  updateAlbumById(@Body() dto: UpdateAlbumDto) {
    return this.musicService.updateAlbumById(dto);
  }

  @Post('remove-album')
  removeAlbumById(@Query('id') id: string) {
    return this.musicService.removeAlbumById(id);
  }

  @Post('add-track')
  @ApiConsumes('application/x-www-form-urlencoded')
  // @ApiConsumes('multipart/form-data')
  //   @UseInterceptors(FileInterceptor('track'))
  addTrack(
    @Body() dto: AddTrackDto,
    // @UploadedFile()
    // file: Express.Multer.File,
  ) {
    return this.musicService.addTrack(dto);
  }

  @Post('update-track')
  @ApiConsumes('application/x-www-form-urlencoded')
  updateTrack(@Body() dto: UpdateTrackDto) {
    return this.musicService.updateTrack(dto);
  }

  @Post('remove-track')
  removeTrack(
    @Query('trackName') trackName: string,
    @Query('albumName') albumName: string,
  ) {
    return this.musicService.removeTrack(
      trackName,
      albumName,
    );
  }
}
