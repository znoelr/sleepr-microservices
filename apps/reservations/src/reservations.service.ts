import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservation.repository';
import { UserDto } from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';
import { map } from 'rxjs';
import {
  PAYMENTS_SERVICE_NAME,
  PaymentsServiceClient,
} from '@app/common/proto-types';

@Injectable()
export class ReservationsService implements OnModuleInit {
  private paymentsService: PaymentsServiceClient;

  constructor(
    private readonly reservationRepository: ReservationRepository,
    @Inject(PAYMENTS_SERVICE_NAME) private readonly paymentsClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.paymentsService = this.paymentsClient.getService(
      PAYMENTS_SERVICE_NAME,
    );
  }

  create(createReservationDto: CreateReservationDto, user: UserDto) {
    return this.paymentsService
      .createPayment({
        ...createReservationDto.payment,
        email: user.email,
      })
      .pipe(
        map(async (paymentResponse: any) =>
          this.reservationRepository.create({
            ...createReservationDto,
            invoiceId: paymentResponse.id,
            timestamp: new Date(),
            userId: user.id,
          }),
        ),
      );
  }

  findAll() {
    return this.reservationRepository.find({});
  }

  findOne(_id: string) {
    return this.reservationRepository.findOne({ _id });
  }

  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  remove(_id: string) {
    return this.reservationRepository.findOneAndDelete({ _id });
  }
}
