import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(
      AppModule,
    );

  app.use(cookieParser());
  app.enableCors({
    origin: [
      // for react
      'http://localhost:3000',
    ],
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Handlerbar template engine
  app.useStaticAssets(join(__dirname, "..", "src", 'homepage'));
  app.setBaseViewsDir(join(__dirname, '..', "src", 'homepage'));
  app.setViewEngine('hbs');

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS Project')
    .setVersion('1.0')
    .addBearerAuth(undefined, 'Token-Please')
    .build();
  const document = SwaggerModule.createDocument(
    app,
    config,
  );
  SwaggerModule.setup('swagger', app, document);

  const port = 3030;
  await app.listen(port);

  const logger = new Logger();
  logger.log(
    `Application runnig -> http://localhost:${port}`,
  );
}
bootstrap();
