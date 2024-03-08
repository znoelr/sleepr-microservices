import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import {
  NOTIFICATIONS_PACKAGE_NAME,
  NOTIFICATIONS_SERVICE_NAME,
} from '@app/common/proto-types';
import { resolve } from 'path';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    ClientsModule.registerAsync([
      {
        name: NOTIFICATIONS_SERVICE_NAME,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: NOTIFICATIONS_PACKAGE_NAME,
            protoPath: resolve(__dirname, '../../../proto/notifications.proto'),
            url: configService.getOrThrow<string>('NOTIFICATIONS_GRPC_URL'),
          },
        }),
      },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
