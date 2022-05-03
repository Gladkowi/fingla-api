import { Module } from '@nestjs/common';
import { SpendService } from './spend.service';
import { SpendController } from './spend.controller';

@Module({
  providers: [SpendService],
  controllers: [SpendController],
  exports: [SpendService]
})
export class SpendModule { }
