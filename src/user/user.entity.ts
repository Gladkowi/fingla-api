import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Role } from './role.enum';

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

  @CreateDateColumn({
    select: false
  })
  createdAt: Date;

  @UpdateDateColumn({
    select: false
  })
  updatedAt: Date;
}
