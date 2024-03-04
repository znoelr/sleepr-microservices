import { CreatePaymentDto, NotifyEmailDto } from '@app/common';
import { Type } from 'class-transformer';
import { IsDefined, IsNotEmptyObject, ValidateNested } from 'class-validator';

export class PaymentPayloadDto extends CreatePaymentDto {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => NotifyEmailDto)
  notify: NotifyEmailDto;
}
