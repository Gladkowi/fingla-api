import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatEntity } from './chat.entity';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CreateChatDto } from './dtos/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity) private chat: Repository<ChatEntity>,
    @InjectRepository(UserEntity) private user: Repository<UserEntity>
  ) {
  }

  getUserForChat(userIds: number[]) {
    return this.user.find({
      where: {
        id: In(userIds),
      },
    });
  }

  async getChats() {
    const [items, count] = await this.chat
    .createQueryBuilder('c')
    .leftJoinAndMapOne(
      'c.messages',
      'c.messages',
      'msg',
      'msg.chat_id = c.id')
    .limit(20)
    .offset(0)
    .getManyAndCount();

    return {
      items,
      count,
    };
  }

  createChat(body: CreateChatDto) {
    return this.chat.save(body);
  }
}
