import {
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('goals')
export class GoalEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
