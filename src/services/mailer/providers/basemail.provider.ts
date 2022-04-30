import { Injectable } from '@nestjs/common';

export const enum MailTypes {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CONFIRM_EMAIL
}

@Injectable()
export abstract class IBaseMailService {
  sendRawMail: (emailTo: string, text: string, subject: string) => {};
  sendMail: (emailTo: string, type: MailTypes, code: string) => {};
}
