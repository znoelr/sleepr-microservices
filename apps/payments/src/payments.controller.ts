import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { PaymentPayloadDto } from './dto/payment-payload.dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_payment')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createPayment(
    @Payload() paymentPayloadDto: PaymentPayloadDto,
    @Ctx() rmqContext: RmqContext,
  ) {
    const channelRef = rmqContext.getChannelRef();
    const message = rmqContext.getMessage();

    // Acknowledge the message to avoid retrying on failure
    channelRef.ack(message);

    return await this.paymentsService.createPayment(paymentPayloadDto);
  }
}
