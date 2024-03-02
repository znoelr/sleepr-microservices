import { IsNotEmpty, IsString } from 'class-validator';

export class TokenPayload {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
