import {
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class AssetEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
