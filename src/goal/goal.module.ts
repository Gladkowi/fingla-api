import { Module } from '@nestjs/common';
import { GoalService } from './goal.service';
import { GoalController } from './goal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalEntity } from './goal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GoalEntity
    ])
  ],
  providers: [GoalService],
  controllers: [GoalController],
  exports: [GoalService]
})
export class GoalModule { }
