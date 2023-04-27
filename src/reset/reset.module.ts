import { Module } from '@nestjs/common';
import { ResetController } from './reset.controller';
import { ResetService } from './reset.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: '0.0.0.0',
        port: 1025,
      },
      defaults: {
        from: 'mehdighorbanin@gmail.com',
      },
    }),
  ],
  controllers: [ResetController],
  providers: [ResetService],
})
export class ResetModule {}
