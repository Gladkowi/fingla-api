import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersEntity } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../user/user.class';
import { RegistrationReqModel } from '../../user/registration.class';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
	constructor(@InjectRepository(UsersEntity) private user: Repository<UsersEntity>, private jwtService: JwtService) {}
	private async registrationValidation(regModel: RegistrationReqModel): Promise<string> {
		if (!regModel.name) {
			return 'Name can\'t be empty';
		}
		if (!regModel.phone) {
			return 'Phone can\'t be empty';
		}
		if (!regModel.password) {
			return 'Password can\'t be empty';
		}
		if (!regModel.role && regModel.role !== 'user') {
			return 'Role can\'t be empty';
		}
		if (regModel.email) {
			const emailRule =
				/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
			if (!emailRule.test(regModel.email.toLowerCase())) {
				return 'Invalid email';
			}
		}
		const phoneRule =
			/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
		if (!phoneRule.test(regModel.phone.toLowerCase())) {
			return 'Invalid phone';
		}
		const userEmail = await this.user.findOne({ email: regModel.email });
		if (userEmail != null && userEmail.email) {
			return 'Email already exist';
		}
		const userPhone = await this.user.findOne({ phone: regModel.phone });
		if (userPhone != null && userPhone.phone) {
			return 'Phone already exist';
		}
		return '';
	}
	private async getPasswordHash(password: string): Promise<string> {
		const hash = await bcrypt.hash(password, 10);
		return hash;
	}
	public async registerUser(regModel: RegistrationReqModel): Promise<User> {
		try {
			const errorMessage = await this.registrationValidation(regModel);
			if (errorMessage) {
				throw new HttpException(
					errorMessage,
					HttpStatus.BAD_REQUEST,
				);
			}
			const newUser = new User();
			newUser.name = regModel.name;
			if (regModel.email) {
				newUser.email = regModel.email;
			}
			newUser.phone = regModel.phone;
			newUser.role = regModel.role;
			newUser.password = await this.getPasswordHash(regModel.password);
			await this.user.insert(newUser);
			delete newUser.password;
			return newUser;
		} catch (e) {
			throw new HttpException(
				`${e}`,
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
	public async validateUserCredentials(phone: string, password: string,): Promise<User> {
		const user = await this.user.findOne({ phone: phone });
		if (user == null) {
			return null;
		}
		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) {
			return null;
		}
		const currentUser = new User();
		currentUser.id = user.id;
		currentUser.name = user.name;
		currentUser.phone = user.phone;
		currentUser.email = user.email;
		currentUser.account = user.account;
		currentUser.role = user.role;
		return currentUser;
	}
	public async getJwtToken(user: User): Promise<string> {
		const payload = {
			...user,
		};
		return this.jwtService.signAsync(payload);
	}
}