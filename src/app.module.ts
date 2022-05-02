import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ConfigService } from './services/config/config.service';
import { MailerModule } from './services/mailer/mailer.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { CategoryModule } from './category/category.module';
import { EventModule } from './event/event.module';
import { ChatModule } from './chat/chat.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ConfigService
    }),
    AuthModule,
    UserModule,
    CategoryModule,
    EventModule,
    ChatModule,
    AdminModule,
    MailerModule,
  ],
  providers: [AuthService]
})
export class AppModule {
}
