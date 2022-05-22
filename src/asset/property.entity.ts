import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { getLink } from '../core/storage';

@Entity('property')
export class PropertyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true
  })
  preview: string | null;

  @AfterLoad()
  getFullUrlForImage() {
    if (this.preview) this.preview = getLink(this.preview);
  }

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
}
