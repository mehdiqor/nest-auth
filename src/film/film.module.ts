import {
  BadRequestException,
  Module,
} from '@nestjs/common';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { diskStorage } from 'multer';
import { editImageName } from 'src/utils';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: async () => ({
        dest: join(
          __dirname,
          '..',
          '..',
          'uploads',
          'films',
        ),
        limits: { fileSize: 50000000 },
        fileFilter: (req, file, cb) => {
          if (
            !file.originalname.match(
              /\.(jpg|jpeg|webp|gif|png)$/,
            )
          ) {
            return cb(
              new BadRequestException(
                'Only images are allowed!',
              ),
              false,
            );
          }
          cb(null, true);
        },
        storage: diskStorage({
          destination: join(
            __dirname,
            '..',
            '..',
            'uploads',
            'films',
          ),
          filename: editImageName,
        }),
      }),
    }),
  ],
  controllers: [FilmController],
  providers: [FilmService],
})
export class FilmModule {}
