import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { client as MailgunClient } from 'mailgun.js';
import * as MsgTemplates from '../mailer.templates';
import { MailTypes, IBaseMailService } from './basemail.provider';

@Injectable()
export class MailgunProvider implements IBaseMailService {
  private client: any;
  messageTemplates: {
    [type: number]: (
      text: string,
      subj: string,
      email?: string
    ) => {
      text: string;
      subject: string;
    };
  } = {};

  constructor(private readonly configService: ConfigService) {
    this.client = MailgunClient({
      username: 'api',
      key: this.configService.get('mailgun.api_key')
    });

    this.messageTemplates[MailTypes.CHANGE_EMAIL] = MsgTemplates.changeEmail;
    this.messageTemplates[MailTypes.CHANGE_PASSWORD] = MsgTemplates.resetPassword;
    this.messageTemplates[MailTypes.CONFIRM_EMAIL] = MsgTemplates.confirmEmail;
  }

  async sendRawMail(emailTo: string, text: string, subject: string) {
    if (text === '' || subject === '') {
      console.error(`Text or subject is empty`);
      return;
    }

    try {
      await this.client.messages.create(
        this.configService.get('mailgun.domain'),
        {
          text,
          subject,
          to: emailTo,
          from: this.configService.get('mailgun.emailFrom')
        }
      );
    } catch (error) {
      console.error(`Error sending email ${error}`);
      return false;
    }

    return true;
  }

  sendMail(emailTo: string, type: MailTypes, code: string) {
    const frontendUrl = this.configService.get('main_url');
    const { text, subject } = this.messageTemplates[type](code, frontendUrl, emailTo);
    return this.sendRawMail(emailTo, text, subject);
  }
}
