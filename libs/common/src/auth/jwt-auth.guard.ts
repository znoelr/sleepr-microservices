import {
  CanActivate,
  ExecutionContext,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { UserDto } from '../dto';
import { AUTH_SERVICE_NAME, AuthServiceClient } from '../proto-types';

export class JwtAuthGuard implements CanActivate, OnModuleInit {
  private authService: AuthServiceClient;

  constructor(
    @Inject(AUTH_SERVICE_NAME) private readonly authClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.authService =
      this.authClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
    if (!jwt) return false;
    return this.authService
      .authenticate({
        Authentication: jwt,
      })
      .pipe(
        tap(
          (user: UserDto) => (context.switchToHttp().getRequest().user = user),
        ),
        map(() => true),
        catchError(() => of(false)),
      );
  }
}
