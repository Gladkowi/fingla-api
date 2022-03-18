import { Strategy } from 'passport-local';
import { User } from '../../user/user.class';
import { UserService } from '../../realization/auth/user.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private userService;
    constructor(userService: UserService);
    validate(phone: string, password: string): Promise<User>;
}
export {};
