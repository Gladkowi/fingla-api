import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { TooManyRequest } from '../core/http.exceptions';
import { IBaseMailService, MailTypes } from '../services/mailer/providers/basemail.provider';
import { SetNewPasswordDto } from './dtos/link.dto';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from './user.entity';
import { ConfigService } from '../services/config/config.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private user: Repository<UserEntity>,
    private readonly mailerService: IBaseMailService,
    private readonly configService: ConfigService
  ) {
  }

  private static getHexString(size: number = 36): string {
    return crypto.randomBytes(size).toString('hex');
  }

  async getLinkForConfirmEmail(email: string) {
    const currentUser = await this.getUserByParam({email});
    if (!currentUser) {
      throw new NotFoundException();
    }
    let uniqueToken = UserService.getHexString(32);
    while (await this.getUserByParam({email, emailConfirmCode: uniqueToken})) {
      uniqueToken = UserService.getHexString(32);
    }
    await this.user.update(currentUser.id, {
        emailConfirmCode: uniqueToken
      }
    );
    this.mailerService.sendMail(
      email, MailTypes.CONFIRM_EMAIL, uniqueToken
    );
  }

  async confirmEmail(code: string) {
    const currentUser = await this.getUserByParam({emailConfirmCode: code});
    if (!currentUser) {
      throw new NotFoundException();
    }
    await this.user.update(currentUser.id, {
        emailConfirmAt: new Date()
      }
    );
  }

  async getLinkForChangeEmail(id: number, email: string) {
    const currentUser = await this.getUserByParam({id});
    if (!currentUser) {
      throw new NotFoundException();
    }

    if (currentUser.emailChangeRequestedAt) {
      const minutesSinceLastRequest = Math.floor((new Date().getTime() - currentUser.emailChangeRequestedAt.getTime()) / 1000 / 60);
      const minutesLastChangeRequest = this.configService.get('user.minutes_last_change_request');
      if (minutesSinceLastRequest < minutesLastChangeRequest) {
        throw new TooManyRequest();
      }
    }

    let uniqueToken = UserService.getHexString(32);
    while (await this.getUserByParam({id, emailChangeCode: uniqueToken})) {
      uniqueToken = UserService.getHexString(32);
    }

    await this.user.update(id, {
      emailChangeAddress: email,
      emailChangeCode: uniqueToken,
      emailChangeRequestedAt: () => 'CURRENT_TIMESTAMP'
    });

    this.mailerService.sendMail(
      email, MailTypes.CHANGE_EMAIL, uniqueToken
    );
  }

  async getUserByParam(param: any) {
    return await this.user.findOne({where: param});
  }

  async confirmChangeEmail(code: string) {
    const currentUser = await this.getUserByParam({emailChangeCode: code});
    if (!currentUser) {
      throw new NotFoundException();
    }
    await this.user.update(
      {emailChangeCode: code},
      {
        email: () => 'email_change_address',
        emailChangeAddress: null,
        emailChangeCode: null
      }
    );
  }

  async getLinkForChangePassword(email: string) {
    const currentUser = await this.getUserByParam({email});
    if (!currentUser) {
      throw new NotFoundException();
    }

    if (currentUser.passwordResetRequestedAt) {
      const minutesSinceLastRequest = Math.floor((new Date().getTime() - currentUser.passwordResetRequestedAt.getTime()) / 1000 / 60);
      const minutesLastChangeRequest = this.configService.get('user.minutes_last_change_request');
      if (minutesSinceLastRequest < minutesLastChangeRequest) {
        throw new TooManyRequest();
      }
    }

    let uniqueToken = UserService.getHexString(32);
    while (await this.getUserByParam({email, passwordResetCode: uniqueToken})) {
      uniqueToken = UserService.getHexString(32);
    }
    await this.user.update(currentUser.id, {
      passwordResetCode: uniqueToken,
      passwordResetRequestedAt: new Date()
    });
    this.mailerService.sendMail(
      email, MailTypes.CHANGE_PASSWORD, uniqueToken
    );
  }

  async confirmChangePassword(data: SetNewPasswordDto, code: string) {
    const currentUser = await this.getUserByParam({passwordResetCode: code});
    if (!currentUser) {
      throw new NotFoundException();
    }
    return this.user.update(
      {passwordResetCode: code},
      {
        password: await AuthService.getPasswordHash(data.password),
        passwordResetCode: null
      }
    );
  }


}
