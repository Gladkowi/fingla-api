import { Module } from '@nestjs/common';
import { SpendService } from './spend.service';
import { SpendController } from './spend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpendEntity } from './spend.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SpendEntity
    ])
  ],
  providers: [SpendService],
  controllers: [SpendController],
  exports: [SpendService]
})
export class SpendModule { }
