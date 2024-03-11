import { UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@app/common';
import { lastValueFrom } from 'rxjs';
import { app } from './app';

export const authContext = async ({ req }) => {
  try {
    const authClient = app.get<ClientProxy>(AUTH_SERVICE);
    const user = await lastValueFrom(
      authClient.send('authenticate', {
        Authentications: req.headers?.Authentication,
      }),
    );
    return { user };
  } catch (error) {
    throw new UnauthorizedException(error);
  }
};
