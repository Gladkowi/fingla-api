import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn, OneToMany
} from 'typeorm';
import { Role } from '../user/role.enum';
import { CategoryEntity } from "./category.entity";
import { MarkEntity } from "./mark.entity";

@Entity('users')
export class UsersEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToMany(() => CategoryEntity, categories => categories.user)
    categories: CategoryEntity[];

    @OneToMany(() => MarkEntity, marks => marks.user)
    marks: MarkEntity[];

    @Column()
    name: string;

    @Column({default: 0})
    account: number;

    @Column({unique: true, nullable: true})
    email: string;

    @Column({unique: true})
    phone: string;

    @Column()
    password: string;

    @Column({type: 'enum', enum: Role, default: Role.USER})
    role: Role;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}