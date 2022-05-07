import {
  Column,
  CreateDateColumn,
  Entity, Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import { SubCategoryEntity } from '../category/subCategory.entity';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true
  })
  comment: string | null

  @Column({
    type: 'decimal',
    nullable: true
  })
  sum: number

  @ManyToOne(
    () => CategoryEntity,
    category => category.events
  )
  @JoinColumn({
    name: 'category_id'
  })
  category: CategoryEntity;

  @Column({
    name: 'category_id'
  })
  categoryId: number;

  @ManyToOne(
    () => SubCategoryEntity,
    subCategory => subCategory.events
  )
  @JoinColumn({
    name: 'subcategory_id'
  })
  subCategory: SubCategoryEntity | null;

  @Column({
    name: 'subcategory_id',
    nullable: true
  })
  subCategoryId: number | null;

  @Column()
  date: Date;

  @Index()
  @Column({
    type: 'varchar',
    nullable: true,
  })
  tag: string | null;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    select: false,
  })
  updatedAt: Date;
}
