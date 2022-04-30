import {
  Body,
  Controller,
  HttpCode,
  Post
} from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller()
export class AuthController {
  constructor(
    private authService: AuthService
  ) {
  }

  @Post('signup')
  registerUser(@Body() body: CreateUserDto) {
    return this.authService.registerUser(body);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() body: LoginDto) {
    return this.authService.login(body)
  }
}
