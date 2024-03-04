import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentPayloadDto } from './dto/payment-payload.dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_payment')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createPayment(@Payload() paymentPayloadDto: PaymentPayloadDto) {
    return await this.paymentsService.createPayment(paymentPayloadDto);
  }
}
