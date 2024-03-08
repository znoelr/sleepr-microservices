import { UserMessage } from '../proto-types';

export class UserDto implements UserMessage {
  id: string;
  email: string;
  password: string;
}
