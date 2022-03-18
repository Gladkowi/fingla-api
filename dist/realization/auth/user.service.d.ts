import { UsersEntity } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { User } from '../../user/user.class';
import { RegistrationReqModel } from '../../user/registration.class';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private user;
    private jwtService;
    constructor(user: Repository<UsersEntity>, jwtService: JwtService);
    private registrationValidation;
    private getPasswordHash;
    registerUser(regModel: RegistrationReqModel): Promise<User>;
    validateUserCredentials(phone: string, password: string): Promise<User>;
    getJwtToken(user: User): Promise<string>;
}
