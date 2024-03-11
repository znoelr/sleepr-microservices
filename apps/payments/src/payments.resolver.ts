import { Query, Resolver } from '@nestjs/graphql';
import { PaymentsService } from './payments.service';
import { PaymentIntentDto } from './dto/payment-intent.dto';

@Resolver()
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Query(() => [PaymentIntentDto], { name: 'payments' })
  findAll() {
    return this.paymentsService.findAll();
  }
}
