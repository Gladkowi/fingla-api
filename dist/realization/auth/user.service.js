"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../entities/user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const user_class_1 = require("../../user/user.class");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(user, jwtService) {
        this.user = user;
        this.jwtService = jwtService;
    }
    async registrationValidation(regModel) {
        if (!regModel.name) {
            return 'Name can\'t be empty';
        }
        if (!regModel.phone) {
            return 'Phone can\'t be empty';
        }
        if (!regModel.password) {
            return 'Password can\'t be empty';
        }
        if (regModel.email) {
            const emailRule = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (!emailRule.test(regModel.email.toLowerCase())) {
                return 'Invalid email';
            }
        }
        const phoneRule = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
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
    async getPasswordHash(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }
    async registerUser(regModel) {
        try {
            const errorMessage = await this.registrationValidation(regModel);
            if (errorMessage) {
                throw new common_1.HttpException(errorMessage, common_1.HttpStatus.BAD_REQUEST);
            }
            const newUser = new user_class_1.User();
            newUser.name = regModel.name;
            if (regModel.email) {
                newUser.email = regModel.email;
            }
            newUser.phone = regModel.phone;
            newUser.password = await this.getPasswordHash(regModel.password);
            await this.user.insert(newUser);
            delete newUser.password;
            return newUser;
        }
        catch (e) {
            throw new common_1.HttpException(`${e}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async validateUserCredentials(phone, password) {
        const user = await this.user.findOne({ phone: phone });
        if (user == null) {
            return null;
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return null;
        }
        const currentUser = new user_class_1.User();
        currentUser.id = user.id;
        currentUser.name = user.name;
        currentUser.phone = user.phone;
        currentUser.email = user.email;
        currentUser.account = user.account;
        currentUser.role = user.role;
        return currentUser;
    }
    async getJwtToken(user) {
        const payload = {
            ...user,
        };
        return this.jwtService.signAsync(payload);
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(user_entity_1.UsersEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository, jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map