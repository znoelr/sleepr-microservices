import { CreatePaymentDto } from '@app/common';
import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';

@InputType()
export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  @Field()
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  @Field()
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  @Field()
  placeId: string;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreatePaymentDto)
  @Field(() => CreatePaymentDto)
  payment: CreatePaymentDto;
}
