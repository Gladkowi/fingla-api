import {
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
