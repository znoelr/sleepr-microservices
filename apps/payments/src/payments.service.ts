import { NOTIFICATIONS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentPayloadDto } from './dto/payment-payload.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-10-16',
    },
  );

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsClientProxy: ClientProxy,
  ) {}

  async createPayment(paymentPayloadDto: PaymentPayloadDto) {
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card: paymentPayloadDto.card,
    // });
    const paymentIntent = await this.stripe.paymentIntents.create({
      // payment_method: paymentMethod.id,
      // payment_method: 'pm_card_visa_chargeDeclined', // For testing purposes (FAIL)
      payment_method: 'pm_card_visa', // For testing purposes (SUCCESS)
      amount: paymentPayloadDto.amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
    });

    /** NOTIFY EMAIL */
    this.notificationsClientProxy.emit('notify_email', {
      email: paymentPayloadDto.email,
      text: `Your reservation of $${paymentPayloadDto.amount} was created successfully`,
    });
    return paymentIntent;
  }
}
