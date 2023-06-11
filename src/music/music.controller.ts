import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
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
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/decorator';
import { RolesEnum } from 'src/utils';

@ApiTags('Music')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('music')
export class MusicController {
  constructor(
    private readonly musicService: MusicService,
  ) {}
  @Post('add-artist')
  @Roles(RolesEnum.ARTIST)
  @ApiConsumes('application/x-www-form-urlencoded')
  addArtist(@Body() dto: AddArtistDto) {
    return this.musicService.addArtist(dto);
  }

  @Patch('update-artist')
  @Roles(RolesEnum.ARTIST)
  @ApiConsumes('application/x-www-form-urlencoded')
  updateArtistById(
    @Query('id') id: string,
    @Body() dto: UpdateArtistDto,
  ) {
    return this.musicService.updateArtistById(id, dto);
  }

  @Delete('remove-artist')
  @Roles(RolesEnum.ARTIST)
  removeArtistByName(
    @Query('artistName') artistName: string,
  ) {
    return this.musicService.removeArtistByName(artistName);
  }

  @Post('add-album')
  @Roles(RolesEnum.ARTIST)
  @ApiConsumes('application/x-www-form-urlencoded')
  addAlbum(@Body() dto: AddAlbumDto) {
    return this.musicService.addAlbum(dto);
  }

  @Patch('update-album')
  @Roles(RolesEnum.ARTIST)
  @ApiConsumes('application/x-www-form-urlencoded')
  updateAlbumById(@Body() dto: UpdateAlbumDto) {
    return this.musicService.updateAlbumById(dto);
  }

  @Delete('remove-album')
  @Roles(RolesEnum.ARTIST)
  removeAlbumById(@Query('id') id: string) {
    return this.musicService.removeAlbumById(id);
  }

  @Post('add-track')
  @Roles(RolesEnum.ARTIST)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('track'))
  addTrack(
    @Body() dto: AddTrackDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.musicService.addTrack(dto, file);
  }

  @Patch('update-track')
  @Roles(RolesEnum.ARTIST)
  @ApiConsumes('application/x-www-form-urlencoded')
  updateTrack(@Body() dto: UpdateTrackDto) {
    return this.musicService.updateTrack(dto);
  }

  @Delete('remove-track')
  @Roles(RolesEnum.ARTIST)
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
