import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentPayloadDto } from './dto/payment-payload.dto';
import {
  PaymentsServiceController,
  PaymentsServiceControllerMethods,
} from '@app/common/proto-types';

@Controller()
@PaymentsServiceControllerMethods()
export class PaymentsController implements PaymentsServiceController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createPayment(paymentPayloadDto: PaymentPayloadDto) {
    return await this.paymentsService.createPayment(paymentPayloadDto);
  }
}
