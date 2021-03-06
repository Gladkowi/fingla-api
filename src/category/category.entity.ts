import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { SubCategoryEntity } from './subCategory.entity';
import { getLink } from '../core/storage';
import { EventEntity } from '../event/event.entity';
import { UserEntity } from '../user/user.entity';
import { CategoryTypeEnum } from './enums/category-type.enum';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  preview: string | null;

  @AfterLoad()
  getFullUrlForImage() {
    if (this.preview) this.preview = getLink(this.preview);
  }

  @Column({
    type: 'decimal',
    nullable: true
  })
  limit: number | null;

  @Column({
    type: 'enum',
    enum: CategoryTypeEnum
  })
  type: CategoryTypeEnum;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: true
  })
  color: string | null;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    select: false,
  })
  updatedAt: Date;

  @OneToMany(
    () => SubCategoryEntity,
    subCategories => subCategories.category,
  )
  subCategories: SubCategoryEntity[];

  @OneToMany(
    () => EventEntity,
    event => event.category,
  )
  events: EventEntity[];

  @ManyToOne(
    () => UserEntity,
    user => user.categories,
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
