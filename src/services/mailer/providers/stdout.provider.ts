import { Injectable } from '@nestjs/common';
import { IBaseMailService, MailTypes } from './basemail.provider';
import * as MsgTemplates from '../mailer.templates';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class StdoutProvider implements IBaseMailService {
  private messageTemplates: {
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
    this.messageTemplates[MailTypes.CHANGE_EMAIL] = MsgTemplates.changeEmail;
    this.messageTemplates[MailTypes.CHANGE_PASSWORD] = MsgTemplates.resetPassword;
    this.messageTemplates[MailTypes.CONFIRM_EMAIL] = MsgTemplates.confirmEmail;
  }

  async sendRawMail(emailTo: string, text: string, subject: string) {
    console.info(`sending message to: ${emailTo} with text: ${text} subject: ${subject}`);
    return true;
  }

  async sendMail(emailTo: string, type: MailTypes, code: string) {
    const frontendUrl = this.configService.get('main_url');
    const { text, subject } = this.messageTemplates[type](code, frontendUrl, emailTo);
    console.info(`New mail:\n\tTo: ${emailTo}\n\tSubject: ${subject}\n\tText: ${text}`);
  }
}
