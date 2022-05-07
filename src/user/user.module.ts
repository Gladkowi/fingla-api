import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailerModule } from '../services/mailer/mailer.module';
import { UserEntity } from './user.entity';
import { ChatEntity } from '../chat/chat.entity';
import { CategoryEntity } from '../category/category.entity';


@Module({
  imports: [
    MailerModule,
    TypeOrmModule.forFeature([
      UserEntity,
      ChatEntity,
      CategoryEntity
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {
}
