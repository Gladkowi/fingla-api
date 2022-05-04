import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ChatEntity } from '../chat.entity';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  text: string;

  @Column()
  author: number;

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

  @ManyToOne(
    () => ChatEntity,
      chat => chat.messages
  )
  @JoinColumn({
    name: 'chat_id'
  })
  chat: ChatEntity;

  @Column({
    type: 'int',
    name: 'chat_id'
  })
  chatId: number;
}
