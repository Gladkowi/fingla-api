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
import { CategoryEntity } from './category.entity';
import { getLink } from '../core/storage';
import { EventEntity } from '../event/event.entity';

@Entity('sub_categories')
export class SubCategoryEntity {
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

  @ManyToOne(
    () => CategoryEntity,
    category => category.subCategories,
  )
  @JoinColumn({
    name: 'category_id',
  })
  category: CategoryEntity;

  @Column({
    name: 'category_id',
  })
  categoryId: number;

  @OneToMany(
    () => EventEntity,
    event => event.subCategory,
  )
  events: EventEntity[];
}
