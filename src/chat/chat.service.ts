import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatEntity } from './chat.entity';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity) private chat: Repository<ChatEntity>,
    @InjectRepository(UserEntity) private user: Repository<UserEntity>
  ) {}

  getUserForChat(userIds: number[]) {
    return this.user.find({
      where: {
        id: In(userIds)
      }
    });
  }
}
