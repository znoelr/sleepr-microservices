import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { NOTIFICATIONS_PACKAGE_NAME } from '@app/common/proto-types';
import { resolve } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const configService = app.get(ConfigService);
  app.use(cookieParser());
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: NOTIFICATIONS_PACKAGE_NAME,
      protoPath: resolve(__dirname, '../../../proto/notifications.proto'),
      url: configService.getOrThrow<string>('NOTIFICATIONS_GRPC_URL'),
    },
  });
  await app.startAllMicroservices();
}
bootstrap();
