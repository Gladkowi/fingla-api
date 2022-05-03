import { Module } from '@nestjs/common';
import { GoalService } from './goal.service';
import { GoalController } from './goal.controller';

@Module({
  providers: [GoalService],
  controllers: [GoalController],
  exports: [GoalService]
})
export class GoalModule { }
