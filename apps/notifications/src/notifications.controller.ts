import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotifyEmailDto } from '@app/common';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @MessagePattern('notify_email')
  async notifyEmail(@Payload() notifyEmailDto: NotifyEmailDto) {
    return this.notificationsService.notifyEmail(notifyEmailDto);
  }
}
