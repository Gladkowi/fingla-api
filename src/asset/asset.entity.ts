import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { AssetActionEntity } from './asset-action.entity';

@Entity('assets')
export class AssetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({
    fulltext: true
  })
  @Column()
  ticker: string;

  @Column()
  count: number;

  @Column({
    type: 'decimal'
  })
  cost: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    select: false,
  })
  updatedAt: Date;

  @ManyToOne(
    () => UserEntity,
    user => user.assets,
  )
  @JoinColumn({
    name: 'user_id'
  })
  user: UserEntity;

  @Column({
    name: 'user_id'
  })
  userId: number;

  @OneToMany(
    () => AssetActionEntity,
    action => action.asset
  )
  actions: AssetActionEntity[];
}
