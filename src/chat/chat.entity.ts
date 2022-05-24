import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable, AfterLoad,
} from 'typeorm';
import { MessageEntity } from './message/message.entity';
import { UserEntity } from '../user/user.entity';
import { getLink } from '../core/storage';

@Entity('chats')
export class ChatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true
  })
  preview: string;

  @AfterLoad()
  getFullUrlForImage() {
    if (this.preview) this.preview = getLink(this.preview);
  }

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at'
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at'
  })
  updatedAt: Date;

  @OneToMany(
    () => MessageEntity,
      message => message.chat
  )
  messages: MessageEntity[];

  @ManyToMany(
    () => UserEntity,
    user => user.chats
  )
  @JoinTable({
    name: 'chat_user',
    joinColumn: {
      name: 'chat_id'
    },
    inverseJoinColumn: {
      name: 'user_id'
    }
  })
  users: UserEntity[];
}
