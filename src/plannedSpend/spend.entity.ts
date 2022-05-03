import {
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('planned_spends')
export class SpendEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
