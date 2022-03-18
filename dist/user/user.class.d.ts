import { Role } from './role.enum';
export declare class User {
    id?: number;
    name?: string;
    account?: number;
    phone: string;
    email?: string;
    password?: string;
    role?: Role;
}
