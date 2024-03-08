import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotifyEmailDto } from '@app/common';
import {
  NotificationsServiceController,
  NotificationsServiceControllerMethods,
} from '@app/common/proto-types';

@Controller()
@NotificationsServiceControllerMethods()
export class NotificationsController implements NotificationsServiceController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
  async notifyEmail(notifyEmailDto: NotifyEmailDto) {
    return this.notificationsService.notifyEmail(notifyEmailDto);
  }
}
