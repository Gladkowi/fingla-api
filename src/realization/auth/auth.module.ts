import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UsersEntity } from "../../entities/user.entity";
import { JwtGuard } from "../../auth/guards/jwt.guard";
import { JwtStrategy } from "../../auth/guards/jwt.strategy";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { UserService } from "./user.service";
import { LocalStrategy } from "../../auth/guards/local.strategy";
import { AuthController } from "./auth.controller";

@Module({
	imports: [
		JwtModule.registerAsync({
			useFactory: () => ({
				secret: process.env.JWT_SECRET,
				signOptions: { expiresIn: '365d' },
			}),
		}),
		TypeOrmModule.forFeature([UsersEntity]),
	],
	providers: [JwtGuard, JwtStrategy, RolesGuard, UserService, LocalStrategy],
	controllers: [AuthController],
	exports: [UserService],
})
export class AuthModule {}
