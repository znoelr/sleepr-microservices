import { NotifyEmailDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationsService {
  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: this.configService.get<string>('SMTP_USER'),
      clientId: this.configService.get<string>('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: this.configService.get<string>(
        'GOOGLE_OAUTH_CLIENT_SECRET',
      ),
      refreshToken: this.configService.get<string>(
        'GOOGLE_OAUTH_REFRESH_TOKEN',
      ),
    },
  });

  constructor(private readonly configService: ConfigService) {}

  async notifyEmail(notifyEmailDto: NotifyEmailDto) {
    await this.transporter.sendMail({
      from: this.configService.get<string>('SMT_USER'),
      to: notifyEmailDto.email,
      subject: 'Sleepr Notification',
      text: notifyEmailDto.text,
    });
  }
}
