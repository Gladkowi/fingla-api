import {
  Column,
  CreateDateColumn,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MessageEntity } from './message/message.entity';

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
}
