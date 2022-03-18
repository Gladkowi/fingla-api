import { Response } from 'express';
import { UserService } from './user.service';
import { RegistrationReqModel } from '../../user/registration.class';
import { RegistrationRespModel } from '../../user/response.class';
export declare class AuthController {
    private userService;
    constructor(userService: UserService);
    registerUser(reg: RegistrationReqModel): Promise<RegistrationRespModel>;
    login(req: any, res: Response): Promise<RegistrationRespModel>;
}
