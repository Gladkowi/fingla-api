import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from './message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dtos/create-message.dto';
import { PaginationDto } from '../../core/dtos/pagination.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private message: Repository<MessageEntity>,
  ) {
  }

  createMessage(body: CreateMessageDto) {
    return this.message.save(body);
  }

  getMessages(id: number, paginate: PaginationDto) {
    return this.message.findAndCount({
      skip: paginate.offset,
      take: paginate.limit,
      where: {
        chatId: id,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async deleteMessage(id: number, userId: number) {
    const result = await this.message.findOne({
      where: {
        id: id,
        author: userId
      },
    });
    if(result) await this.message.delete(result.id);
  }
}
