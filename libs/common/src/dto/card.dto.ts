import { Field, InputType } from '@nestjs/graphql';
import { IsCreditCard, IsNumber, IsString } from 'class-validator';

@InputType()
export class CardDto {
  @IsString()
  @Field()
  cvc: string;

  @IsNumber()
  @Field()
  exp_month: number;

  @IsNumber()
  @Field()
  exp_year: number;

  @IsCreditCard()
  @Field()
  number: string;
}
