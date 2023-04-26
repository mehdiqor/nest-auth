import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

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
