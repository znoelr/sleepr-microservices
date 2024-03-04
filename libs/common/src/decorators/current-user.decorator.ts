import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from '../dto';

const getCurrentuserByContext = (context: ExecutionContext): UserDto => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentuserByContext(context),
);
