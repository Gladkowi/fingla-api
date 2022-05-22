import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetActionEntity } from './asset-action.entity';
import { AssetEntity } from './asset.entity';
import { PropertyEntity } from './property.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AssetEntity,
      AssetActionEntity,
      PropertyEntity
    ])
  ],
  providers: [AssetService],
  controllers: [AssetController],
  exports: [AssetService]
})
export class AssetModule { }
