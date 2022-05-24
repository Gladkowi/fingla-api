import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatEntity } from './chat.entity';
import { In, Repository, SelectQueryBuilder } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CreateChatDto } from './dtos/create-chat.dto';
import { PaginationDto } from '../core/dtos/pagination.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private chat: Repository<ChatEntity>,
    @InjectRepository(UserEntity)
    private user: Repository<UserEntity>,
  ) {
  }

  getUserForChat(userPhones: string[]) {
    return this.user.find({
      where: {
        phone: In(userPhones),
      },
    });
  }

  async getChats(userId: number, paginate: PaginationDto) {
    const [items, count] = await this.chat.findAndCount({
      relations: ['messages', 'users'],
      where: (qb: SelectQueryBuilder<UserEntity>) => {
        qb.where('user_id = :userId', { userId });
      },
      skip: 0,
      take: 20,
    });

    return {
      items,
      count,
    };
  }

  getChat(id: number) {
    return this.chat.findOne(id);
  }

  createChat(body: CreateChatDto) {
    return this.chat.save(body);
  }

  async checkAccess(userId: number, roomId: number): Promise<boolean> {
    const result = await this.chat.findOne(roomId,{
      relations: ['users'],
      where: (qb: SelectQueryBuilder<UserEntity>) => {
        qb.where('user_id = :userId', { userId });
      },
    });

    return !!result;
  }
}
