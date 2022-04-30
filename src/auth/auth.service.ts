import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtPayload } from './interface/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dtos/login.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { SignIn } from './interface/signIn.interface';
import * as argon2 from 'argon2';
import { AlreadyExists, LoginFailed } from '../core/http.exceptions';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private user: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {
  }

  static async getPasswordHash(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  validateUser(payload: JwtPayload): Promise<any> {
    return this.user.findOne({
      where: {
        phone: payload.phone
      }
    })
  }

  async registerUser(body: CreateUserDto) {
    const checkUser = await this.user
    .createQueryBuilder('usr')
    .where('usr.phone = :phone', {phone: body.phone})
    .orWhere('usr.email = :email', {email: body.email})
    .getOne()
    if (checkUser) {
      throw new AlreadyExists();
    }
    const pass = body.password;
    await this.create(body);
    this.userService.getLinkForConfirmEmail(body.email).catch(e => console.log(e));
    const token = await this.getTokenByLoginPair({
      phone: body.phone,
      password: pass
    });
    return {
      token
    };
  }

  async create(body) {
    body.password = await AuthService.getPasswordHash(body.password);
    const user = await this.user.save(body);
    delete user.password;
    return user;
  }

  async login(body: LoginDto) {
    const token = await this.getTokenByLoginPair({
      phone: body.phone,
      password: body.password
    });

    return {
      token
    };
  }

  async getTokenByLoginPair(loginParam: SignIn) {
    const user = await this.findByLoginPair(loginParam);
    if (!user) {
      throw new LoginFailed();
    }
    return this.composeToken(user);
  }

  async findByLoginPair(loginParam: SignIn) {
    const user = await this.user.findOne({
      phone: loginParam.phone
    });
    if (!user) return null;
    if (await argon2.verify(user.password, loginParam.password)) {
      return user;
    }
    return null;
  }

  composeToken(user: UserEntity) {
    if (!user.phone) {
      throw new NotFoundException();
    }
    const payload: JwtPayload = {
      userid: user.id,
      phone: user.phone,
      role: user.role
    };
    return `${this.jwtService.sign(payload)}`;
  }
}
