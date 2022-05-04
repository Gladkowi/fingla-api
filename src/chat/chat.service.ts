import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatEntity } from './chat.entity';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CreateChatDto } from './dtos/create-chat.dto';
import { HelperService } from '../services/helper/helper.service';
import { MessageEntity } from './message/message.entity';
import { groupBy } from 'rxjs/operators';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity) private chat: Repository<ChatEntity>,
    @InjectRepository(UserEntity) private user: Repository<UserEntity>,
    private helperService: HelperService,
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

    items.forEach(item => {
      item.preview = this.helperService.getLink(item.preview);
    });

    return {
      items,
      count,
    };
  }

  async createChat(body: CreateChatDto) {
    body.preview = this.helperService.setLink(body.preview);
    const chat = await this.chat.save(body);
    chat.preview = this.helperService.getLink(chat.preview);
    return chat;
  }
}
