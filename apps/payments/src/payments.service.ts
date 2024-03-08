import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentPayloadDto } from './dto/payment-payload.dto';
import {
  NOTIFICATIONS_SERVICE_NAME,
  NotificationsServiceClient,
} from '@app/common/proto-types';

@Injectable()
export class PaymentsService implements OnModuleInit {
  private notificationsService: NotificationsServiceClient;
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-10-16',
    },
  );

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE_NAME)
    private readonly notificationsClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.notificationsService = this.notificationsClient.getService(
      NOTIFICATIONS_SERVICE_NAME,
    );
  }

  async createPayment(paymentPayloadDto: PaymentPayloadDto) {
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card: {
    //     cvc: paymentPayloadDto.card.cvc,
    //     number: paymentPayloadDto.card.number,
    //     exp_year: paymentPayloadDto.card.expYear,
    //     exp_month: paymentPayloadDto.card.expMonth,
    //   },
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
    this.notificationsService
      .notifyEmail({
        email: paymentPayloadDto.email,
        text: `Your reservation of $${paymentPayloadDto.amount} was created successfully`,
      })
      .subscribe(() => {});
    return paymentIntent;
  }
}
