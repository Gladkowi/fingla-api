import { UsersEntity } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private user;
    private jwtService;
    constructor(user: Repository<UsersEntity>, jwtService: JwtService);
    private static getHexString;
    getLinkForConfirmEmail(email: string): Promise<void>;
}
