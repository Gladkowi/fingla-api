import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EventEntity } from './event.entity';
import { EventService } from './event.service';
import { EventController } from './event.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventEntity
    ])
  ],
  providers: [EventService],
  controllers: [EventController],
  exports: [EventService]
})
export class EventModule {
}
