import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from './message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dtos/create-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity) private message: Repository<MessageEntity>
  ) { }

  createMessage(body: CreateMessageDto) {
    return this.message.save(body)
  }

  getMessages(id: number) {
    return this.message.find({
      where: {
        chatId: id
      }
    })
  }

  deleteMessage(id: number) {
    return this.message.delete(id)
  }
}
