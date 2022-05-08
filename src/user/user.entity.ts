import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  AfterLoad
} from 'typeorm';
import { Role } from './role.enum';
import { CategoryEntity } from '../category/category.entity';
import { getLink } from '../core/storage';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({
    default: 0
  })
  account: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true
  })
  photo: string | null;

  @AfterLoad()
  getFullUrlForImage() {
    if (this.photo) this.photo = getLink(this.photo);
  }

  @Column({
    type: 'varchar',
    unique: true,
    length: 100
  })
  email: string;

  @Column({
    type: 'varchar',
    unique: true,
    length: 100
  })
  phone: string;

  @Column({
    select: false
  })
  password: string;

  @Column('enum', {
    enum: Role,
    default: Role.USER
  })
  role: Role;

  @Column('char', {
    length: 64,
    select: false,
    nullable: true,
    name: 'email_confirm_code'
  })
  emailConfirmCode: string | null;

  @Column('timestamptz', {
    nullable: true,
    name: 'email_confirm_at',
    select: false
  })
  emailConfirmAt: Date | null;

  @Column('char', {
    length: 64,
    select: false,
    nullable: true,
    name: 'email_change_code'
  })
  emailChangeCode: string | null;

  @Column('char', {
    length: 64,
    select: false,
    nullable: true,
    name: 'email_change_address'
  })
  emailChangeAddress: string | null;

  @Column('timestamptz', {
    nullable: true,
    name: 'email_change_requested_at',
    select: false
  })
  emailChangeRequestedAt: Date | null;

  @Column('char', {
    length: 64,
    select: false,
    nullable: true,
    name: 'password_reset_code'
  })
  passwordResetCode: string | null;

  @Column('timestamptz', {
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
    name: 'password_reset_requested_at',
    select: false
  })
  passwordResetRequestedAt: Date;

  @OneToMany(
    () => CategoryEntity,
    category => category.user
  )
  categories: CategoryEntity[]

  @CreateDateColumn({
    select: false
  })
  createdAt: Date;

  @UpdateDateColumn({
    select: false
  })
  updatedAt: Date;
}
