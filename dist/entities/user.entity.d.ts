import { Role } from '../user/role.enum';
import { CategoryEntity } from "./category.entity";
import { MarkEntity } from "./mark.entity";
export declare class UsersEntity {
    id: number;
    categories: CategoryEntity[];
    marks: MarkEntity[];
    name: string;
    account: number;
    email: string;
    phone: string;
    password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}
