import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/utils';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: async () => ({
        dest: join(__dirname, '..', '..', 'uploads', 'musics'),
        limits: { fileSize: 50000000 },
        fileFilter: (req, file, cb) => {
          if (!file.originalname.match(/\.(mp3|m4a)$/)) {
            return cb(
              new Error('Only audio files are allowed!'),
              false,
            );
          }
          cb(null, true);
        },
        storage: diskStorage({
          destination: join(__dirname, '..', '..', 'uploads', 'musics'),
          filename: editFileName,
        }),
      }),
    }),
  ],
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule {}
