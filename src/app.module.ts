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
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { APP_INTERCEPTOR } from '@nestjs/core';
@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      url: process.env.REDIS_HOST,
    }),
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
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
