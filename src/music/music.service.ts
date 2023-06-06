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
import { ConfigService } from '@nestjs/config';
import getAudioDurationInSeconds from 'get-audio-duration';
import * as path from 'path';
import * as fs from 'fs';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class MusicService {
  constructor(private config: ConfigService) {}

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

  async addTrack(
    dto: AddTrackDto,
    file: Express.Multer.File,
  ) {
    const address = 'add-track';

    // uploaded file directory
    const host = this.config.get('HOST');
    const port = this.config.get('PORT');
    const filePath = `${host}:${port}/${file.filename}`;

    // calculate track length
    const seconds = await getAudioDurationInSeconds(
      file.path,
    );
    const length = this.getTime(seconds);

    const data = {
      artistName: dto.artistName,
      albumName: dto.albumName,
      trackName: dto.trackName,
      tags: dto.tags,
      youtube_link: dto.youtube_link,
      fileName: file.filename,
      filePath,
      length,
    };

    // upload file to google drive
    const fileAddress = path.join(
      __dirname,
      '..',
      '..',
      'uploads',
      'musics',
      file.filename,
    );
    // const googleUpload = await this.uploadToGoogleDrive(
    //   fileAddress,
    //   file.filename,
    // );

    const result = this.sendData(address, data);
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
      albumName,
    };

    const result = this.sendData(address, data);

    // delete track file
    // const {fileName} = result
    // deleteFileInPublic(fileName);

    return result;
  }

  @OnEvent('admin.musicData')
  getAllData(
    message: string,
    resolve: (data: any) => void,
  ) {
    const result = this.sendData('all-musics', message);
    resolve(result);
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

  getTime(seconds: number): string {
    let total: number = Math.round(seconds) / 60;
    let [minutes, percent]: string[] =
      String(total).split('.');
    let second: string = Math.round(
      (Number(percent) * 60) / 100,
    )
      .toString()
      .substring(0, 2);
    let hour: number = 0;
    if (Number(minutes) > 60) {
      total = Number(minutes) / 60;
      let [h1, percent] = String(total).split('.');
      hour = Number(h1);
      minutes = Math.round((Number(percent) * 60) / 100)
        .toString()
        .substring(0, 2);
    }
    if (String(hour).length == 1) hour = Number(`0${hour}`);
    if (String(minutes).length == 1)
      minutes = String(`0${minutes}`);
    if (String(second).length == 1)
      second = String(`0${second}`);
    return hour + ':' + minutes + ':' + second;
  }

  // async uploadToGoogleDrive(
  //   finalPath: string,
  //   fileName: string,
  // ) {
  //   const driveClientId = this.config.get(
  //     'GOOGLE_DRIVE_CLIENT_ID',
  //   );
  //   const driveClientSecret = this.config.get(
  //     'GOOGLE_DRIVE_CLIENT_SECRET',
  //   );
  //   const driveRedirectUri = this.config.get(
  //     'GOOGLE_DRIVE_REDIRECT_URI',
  //   );
  //   const driveRefreshToken = this.config.get(
  //     'GOOGLE_DRIVE_REFRESH_TOKEN',
  //   );

  //   // create client
  //   const googleDriveService = new GoogleDriveService(
  //     driveClientId,
  //     driveClientSecret,
  //     driveRedirectUri,
  //     driveRefreshToken,
  //   );

  //   // check exist file
  //   const folderName = 'Musics';

  //   if (!fs.existsSync(finalPath)) {
  //     throw new Error('File not found!');
  //   }

  //   // check and create folder
  //   let folder = await googleDriveService
  //     .searchFolder(folderName)
  //     .catch((error) => {
  //       console.error(error);
  //       return null;
  //     });

  //   if (!folder) {
  //     folder = await googleDriveService.createFolder(
  //       folderName,
  //     );
  //   }

  //   // save file in google drive
  //   await googleDriveService
  //     .saveFile(
  //       fileName,
  //       finalPath,
  //       'audio/mpeg',
  //       folder.id,
  //     )
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //   console.info('File uploaded successfully!');

  //   // Delete the file on local
  //   fs.unlinkSync(finalPath);
  // }
}
