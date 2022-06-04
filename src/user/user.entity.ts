import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  AfterLoad,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Role } from './role.enum';
import { CategoryEntity } from '../category/category.entity';
import { getLink } from '../core/storage';
import { ChatEntity } from '../chat/chat.entity';
import { GoalEntity } from '../goal/goal.entity';
import { AssetEntity } from '../asset/asset.entity';
import { SpendEntity } from '../plannedSpend/spend.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'decimal',
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

  @Column({
    type: 'date',
    name: 'banned_at',
    nullable: true
  })
  bannedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    select: false
  })
  updatedAt: Date;

  @OneToMany(
    () => CategoryEntity,
    category => category.user
  )
  categories: CategoryEntity[]

  @ManyToMany(
    () => ChatEntity,
    chat => chat.users
  )
  @JoinTable({
    name: 'chat_user',
    joinColumn: {
      name: 'user_id'
    },
    inverseJoinColumn: {
      name: 'chat_id'
    }
  })
  chats: ChatEntity[];

  @OneToMany(
    () => GoalEntity,
    goal => goal.user
  )
  goals: GoalEntity[]

  @OneToMany(
    () => AssetEntity,
    asset => asset.user
  )
  assets: AssetEntity[]

  @OneToMany(
    () => SpendEntity,
    spend => spend.user
  )
  planedSpends: SpendEntity[]
}
