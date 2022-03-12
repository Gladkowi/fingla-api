import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { User } from '../../user/user.class';
import { Response } from 'express';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { RegistrationReqModel } from '../../user/registration.class';
import { RegistrationRespModel } from '../../user/response.class';

@Controller()
export class AuthController {
	constructor(private userService: UserService) {}

	@Post('signup')
	async registerUser(@Body() reg: RegistrationReqModel) {
		const result = new RegistrationRespModel();
		const user = await this.userService.registerUser(reg);
		const token = await this.userService.getJwtToken(user as User);
		result.successStatus = true;
		result.message = 'Success';
		result.data = {
			user: user,
			token: token,
		};
		return result;
	}

	@Post('login')
	@HttpCode(200)
	@UseGuards(AuthGuard('local'))
	async login(@Req() req, @Res({ passthrough: true }) res: Response) {
		const result = new RegistrationRespModel();
		const token = await this.userService.getJwtToken(req.user as User);
		result.successStatus = true;
		result.message = 'Success';
		result.data = {
			user: req.user,
			token: token,
		};
		return result;
	}
}
