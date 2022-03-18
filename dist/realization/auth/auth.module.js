"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../../entities/user.entity");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const jwt_strategy_1 = require("../../auth/guards/jwt.strategy");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const user_service_1 = require("./user.service");
const local_strategy_1 = require("../../auth/guards/local.strategy");
const auth_controller_1 = require("./auth.controller");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            jwt_1.JwtModule.registerAsync({
                useFactory: () => ({
                    secret: process.env.JWT_SECRET,
                    signOptions: { expiresIn: '365d' },
                }),
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UsersEntity]),
        ],
        providers: [jwt_guard_1.JwtGuard, jwt_strategy_1.JwtStrategy, roles_guard_1.RolesGuard, user_service_1.UserService, local_strategy_1.LocalStrategy],
        controllers: [auth_controller_1.AuthController],
        exports: [user_service_1.UserService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map