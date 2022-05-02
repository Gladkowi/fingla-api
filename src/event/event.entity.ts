import {
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
