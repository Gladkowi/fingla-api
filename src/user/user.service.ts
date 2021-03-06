import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { TooManyRequest } from '../core/http.exceptions';
import { IBaseMailService, MailTypes } from '../services/mailer/providers/basemail.provider';
import { SetNewPasswordDto } from './dtos/link.dto';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from './user.entity';
import { ConfigService } from '../services/config/config.service';
import { ChatEntity } from '../chat/chat.entity';
import { CategoryEntity } from '../category/category.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AssetEntity } from '../asset/asset.entity';
import { GoalEntity } from '../goal/goal.entity';
import { SpendEntity } from '../plannedSpend/spend.entity';
import { PropertyEntity } from '../asset/property.entity';
import { format, lastDayOfMonth, startOfMonth } from 'date-fns';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private user: Repository<UserEntity>,
    @InjectRepository(CategoryEntity) private category: Repository<CategoryEntity>,
    @InjectRepository(ChatEntity) private chat: Repository<ChatEntity>,
    @InjectRepository(GoalEntity) private goal: Repository<GoalEntity>,
    @InjectRepository(AssetEntity) private asset: Repository<AssetEntity>,
    @InjectRepository(SpendEntity) private plannedSpend: Repository<SpendEntity>,
    @InjectRepository(PropertyEntity) private property: Repository<PropertyEntity>,
    private readonly mailerService: IBaseMailService,
    private readonly configService: ConfigService,
  ) {
  }

  private static getHexString(size: number = 36): string {
    return crypto.randomBytes(size).toString('hex');
  }

  getUserById(id: number) {
    return this.user.findOne(id);
  }

  async getLinkForConfirmEmail(email: string) {
    const currentUser = await this.getUserByParam({ email });
    if (!currentUser) {
      throw new NotFoundException();
    }
    let uniqueToken = UserService.getHexString(32);
    while (await this.getUserByParam({ email, emailConfirmCode: uniqueToken })) {
      uniqueToken = UserService.getHexString(32);
    }
    await this.user.update(currentUser.id, {
        emailConfirmCode: uniqueToken,
      },
    );
    this.mailerService.sendMail(
      email, MailTypes.CONFIRM_EMAIL, uniqueToken,
    );
  }

  async confirmEmail(code: string) {
    const currentUser = await this.getUserByParam({ emailConfirmCode: code });
    if (!currentUser) {
      throw new NotFoundException();
    }
    await this.user.update(currentUser.id, {
        emailConfirmAt: new Date(),
      },
    );
  }

  async getLinkForChangeEmail(id: number, email: string) {
    const currentUser = await this.getUserByParam({ id });
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
    while (await this.getUserByParam({ id, emailChangeCode: uniqueToken })) {
      uniqueToken = UserService.getHexString(32);
    }

    await this.user.update(id, {
      emailChangeAddress: email,
      emailChangeCode: uniqueToken,
      emailChangeRequestedAt: () => 'CURRENT_TIMESTAMP',
    });

    this.mailerService.sendMail(
      email, MailTypes.CHANGE_EMAIL, uniqueToken,
    );
  }

  async getUserByParam(param: any) {
    return await this.user.findOne({ where: param });
  }

  async confirmChangeEmail(code: string) {
    const currentUser = await this.getUserByParam({ emailChangeCode: code });
    if (!currentUser) {
      throw new NotFoundException();
    }
    await this.user.update(
      { emailChangeCode: code },
      {
        email: () => 'email_change_address',
        emailChangeAddress: null,
        emailChangeCode: null,
      },
    );
  }

  async getLinkForChangePassword(email: string) {
    const currentUser = await this.getUserByParam({ email });
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
    while (await this.getUserByParam({ email, passwordResetCode: uniqueToken })) {
      uniqueToken = UserService.getHexString(32);
    }
    await this.user.update(currentUser.id, {
      passwordResetCode: uniqueToken,
      passwordResetRequestedAt: new Date(),
    });
    this.mailerService.sendMail(
      email, MailTypes.CHANGE_PASSWORD, uniqueToken,
    );
  }

  async confirmChangePassword(data: SetNewPasswordDto, code: string) {
    const currentUser = await this.getUserByParam({ passwordResetCode: code });
    if (!currentUser) {
      throw new NotFoundException();
    }
    return this.user.update(
      { passwordResetCode: code },
      {
        password: await AuthService.getPasswordHash(data.password),
        passwordResetCode: null,
      },
    );
  }

  async getHomePage(userId: number) {
    const endDate = lastDayOfMonth(new Date());
    const startDate = startOfMonth(new Date());

    const categories = await this.category
    .createQueryBuilder('c')
    .select([
      'c.id AS id',
      'c.name AS name',
      'c.limit AS limit',
      'c.preview AS preview',
      'c.color AS color',
    ])
    .addSelect('SUM(e.sum)', 'value')
    .leftJoin('c.events', 'e')
    .where('c.user_id = :userId', {
      userId,
    })
    .andWhere('c.limit IS NOT NULL')
    .andWhere('e.date BETWEEN :start AND :end ', {
      start: startDate,
      end: endDate,
    })
    .limit(6)
    .groupBy('c.id')
    .getRawMany();

    const chats = await this.chat.find({
      relations: ['users'],
      where: (qb: SelectQueryBuilder<UserEntity>) => {
        qb.where('user_id = :userId', { userId });
      },
      take: 6,
    });

    const goals = await this.goal.find({
      where: {
        userId,
      },
      take: 6,
    });

    const assets = await this.asset
    .createQueryBuilder('a')
    .select('SUM(a.cost * a.count)', 'sum')
    .where('a.user_id = :userId', {
      userId,
    })
    .getRawOne();

    const property = await this.property
    .createQueryBuilder('p')
    .select('SUM(p.cost)', 'sum')
    .where('p.user_id = :userId', {
      userId,
    })
    .getRawOne();

    return {
      categories,
      chats,
      goals,
      assets: +assets.sum,
      property: +property.sum,
    };
  }

  async getUserInfoByToken(userId: number) {
    const endDate = lastDayOfMonth(new Date());
    const startDate = new Date();

    const user = await this.user.findOneOrFail({
      id: userId,
    });

    const planedSpendOneTime = await this.plannedSpend
    .createQueryBuilder('s')
    .select('SUM(s.cost)', 'sum')
    .where('s.userId = :userId', { userId })
    .andWhere('s.isMonthly = false')
    .andWhere('s.date BETWEEN :start AND :end', {
      start: startDate,
      end: endDate,
    })
    .getRawOne();

    const planedSpendMoreTime = await this.plannedSpend
    .createQueryBuilder('s')
    .select('SUM(s.cost)', 'sum')
    .where('s.userId = :userId', { userId })
    .andWhere('s.isMonthly = true')
    .andWhere('EXTRACT(DAY FROM s.date) BETWEEN :start AND :end', {
      start: format(startDate, 'dd'),
      end: format(endDate, 'dd'),
    })
    .getRawOne();

    return {
      user,
      spend: +planedSpendOneTime.sum + +planedSpendMoreTime.sum,
    };
  }

  async updateUser(userId: number, body: UpdateUserDto) {
    await this.user.update(userId, body);
  }
}
