import { CreatePaymentDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-10-16',
    },
  );

  constructor(private readonly configService: ConfigService) {}

  async createPayment(createPaymentDto: CreatePaymentDto) {
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card: createPaymentDto.card,
    // });
    const paymentIntent = await this.stripe.paymentIntents.create({
      // payment_method: paymentMethod.id,
      payment_method: 'pm_card_visa', // For testing purposes
      amount: createPaymentDto.amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
    });
    return paymentIntent;
  }
}
