import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './chat.entity';
import { MessageEntity } from './message/message.entity';
import { MessageService } from './message/message.service';
import { MessageController } from './message/message.controller';
import { MessageGateway } from './message/message.gateway';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { UserEntity } from '../user/user.entity';
import { HelperModule } from '../services/helper/helper.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    HelperModule,
    TypeOrmModule.forFeature([
      ChatEntity,
      MessageEntity,
      UserEntity
    ])
  ],
  providers: [ChatService, MessageService, MessageGateway],
  controllers: [ChatController, MessageController],
  exports: [ChatService, MessageService]
})
export class ChatModule { }
