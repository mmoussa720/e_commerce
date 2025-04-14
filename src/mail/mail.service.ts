import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(emailDto: CreateMailDto) {
    const url = `google.com`;
    await this.mailerService
      .sendMail({
        to: emailDto.to,
        from: process.env.MAILDEV_INCOMING_USER,
        subject: emailDto.subject,
      })
      .then(() => {})
      .catch(() => {});
  }
}
