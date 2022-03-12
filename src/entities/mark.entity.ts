import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EventEntity } from "./event.entity";
import { UsersEntity } from "./user.entity";

@Entity('marks')
export class MarkEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => EventEntity, event => event.mark)
    events: EventEntity[];

    @ManyToOne(() => UsersEntity, user => user.marks)
    user: UsersEntity;

    @Column()
    name: string;
}