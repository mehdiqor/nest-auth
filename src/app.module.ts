import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { MusicModule } from './music/music.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ElasticModule } from './elastic/elastic.module';
import { FilmModule } from './film/film.module';
import { SpotifyModule } from './spotify/spotify.module';
import { AdminModule } from './admin/admin.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    BookmarkModule,
    MusicModule,
    ElasticModule,
    FilmModule,
    SpotifyModule,
    AdminModule
  ],
})
export class AppModule {}
