import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.useLogger(app.get(Logger));
  await app.listen(3000);
}
bootstrap();
