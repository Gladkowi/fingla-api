import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ActionTypeEnum } from './enums/actionType.enum';
import { AssetEntity } from './asset.entity';

@Entity('asset_actions')
export class AssetActionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true
  })
  ticker: string;

  @Column({
    type: 'enum',
    enum: ActionTypeEnum
  })
  type: ActionTypeEnum;

  @Column({
    nullable: true
  })
  count: number;

  @Column({
    nullable: true
  })
  cost: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @ManyToOne(
    () => AssetEntity,
    asset => asset.actions
  )
  @JoinColumn({
    name: 'asset_id'
  })
  asset: AssetEntity;

  @Column({
    name: 'asset_id'
  })
  assetId: number;
}
