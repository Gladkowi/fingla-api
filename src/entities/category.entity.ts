import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EventEntity } from "./event.entity";
import { UsersEntity } from "./user.entity";
import { GroupEntity } from "./group.entity";
import { CategoryTypeEnum } from "../realization/main/types/categoryType.enum";

@Entity('categories')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => EventEntity, event => event.category)
    events: EventEntity[]

    @ManyToOne(() => UsersEntity, user => user.categories)
    user: UsersEntity;

    @OneToMany(() => GroupEntity, group => group.categories, {nullable: true})
    group: GroupEntity;

    @Column()
    name: string;

    @Column({nullable: true})
    limit: number;

    @Column()
    color: string;

    @Column({type: 'enum', enum: CategoryTypeEnum})
    type: CategoryTypeEnum
}