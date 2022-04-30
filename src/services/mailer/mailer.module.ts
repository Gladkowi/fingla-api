import { Module } from '@nestjs/common';
import { MailgunProvider } from './providers/mailgun.provider';
import { IBaseMailService } from './providers/basemail.provider';
import { StdoutProvider } from './providers/stdout.provider';

const mailerServiceProvider = {
  provide: IBaseMailService,
  useClass:
    process.env.MAIL_PROVIDER === 'stdout'
      ? StdoutProvider
      : MailgunProvider
};

@Module({
  imports: [],
  providers: [mailerServiceProvider],
  exports: [mailerServiceProvider]
})
export class MailerModule {
}
