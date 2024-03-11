import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymentIntentDto {
  @Field()
  id: string;

  @Field()
  amount: number;
}
