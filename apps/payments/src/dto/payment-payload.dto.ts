import { CreatePaymentDto } from '@app/common';
import { CreatePaymentMessage } from '@app/common/proto-types';
import { IsEmail } from 'class-validator';

export class PaymentPayloadDto
  extends CreatePaymentDto
  implements CreatePaymentMessage
{
  @IsEmail()
  email: string;
}
