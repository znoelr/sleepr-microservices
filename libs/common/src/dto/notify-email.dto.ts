import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { NotifyEmailMessage } from '../proto-types';

export class NotifyEmailDto implements NotifyEmailMessage {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
