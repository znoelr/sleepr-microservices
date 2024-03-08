import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { PAYMENTS_PACKAGE_NAME } from '@app/common/proto-types';
import { resolve } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const configService = app.get(ConfigService);
  app.use(cookieParser());
  app.useLogger(app.get(Logger));
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: PAYMENTS_PACKAGE_NAME,
      protoPath: resolve(__dirname, '../../../proto/payments.proto'),
      url: configService.getOrThrow<string>('PAYMENTS_GRPC_URL'),
    },
  });
  await app.startAllMicroservices();
}
bootstrap();
