import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./category.entity";
import { MarkEntity } from "./mark.entity";

@Entity('events')
export class EventEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CategoryEntity, category => category.events, {nullable: false})
    category: CategoryEntity;

    @ManyToOne(() => MarkEntity, mark => mark.events, {nullable: true})
    mark: MarkEntity;

    @Column({nullable: true})
    comment: string;

    @Column()
    value: number;

    @Column({nullable: true, type: "timestamptz"})
    date: Date;
}