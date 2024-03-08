import { IsCreditCard, IsNumber, IsString } from 'class-validator';
import { PaymentCardMessage } from '../proto-types';

export class CardDto implements PaymentCardMessage {
  @IsString()
  cvc: string;

  @IsNumber()
  expMonth: number;

  @IsNumber()
  expYear: number;

  @IsCreditCard()
  number: string;
}
