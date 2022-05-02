import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './chat.entity';
import { MessageEntity } from './message/message.entity';
import { MessageService } from './message/message.service';
import { MessageController } from './message/message.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChatEntity,
      MessageEntity
    ])
  ],
  providers: [ChatService, MessageService],
  controllers: [ChatController, MessageController],
  exports: [ChatService, MessageService]
})
export class ChatModule { }
