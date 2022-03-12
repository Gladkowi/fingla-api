import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./category.entity";

@Entity('groups')
export class GroupEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => CategoryEntity, categories => categories.group)
    categories: CategoryEntity[];

    @Column()
    name: string;
}