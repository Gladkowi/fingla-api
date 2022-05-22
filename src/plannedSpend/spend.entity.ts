import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('planned_spends')
export class SpendEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    default: false
  })
  isMonthly: boolean;

  @Column()
  date: Date;

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
    user => user.planedSpends,
  )
  @JoinColumn({
    name: 'user_id'
  })
  user: UserEntity;

  @Column({
    name: 'user_id'
  })
  userId: number;
}
