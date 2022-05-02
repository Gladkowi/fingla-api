import {
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('chats')
export class ChatEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
