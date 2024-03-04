import { CreatePaymentDto } from '@app/common';
import { IsEmail } from 'class-validator';

export class PaymentPayloadDto extends CreatePaymentDto {
  @IsEmail()
  email: string;
}
