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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../entities/user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const crypto = require("crypto");
const http_exceptions_1 = require("../../core/http.exceptions");
let UserService = UserService_1 = class UserService {
    constructor(user, jwtService) {
        this.user = user;
        this.jwtService = jwtService;
    }
    static getHexString(size = 36) {
        return crypto.randomBytes(size).toString('hex');
    }
    async getLinkForConfirmEmail(email) {
        const currentUser = await this.getUserByParam({ email });
        if (!currentUser) {
            throw new common_1.NotFoundException();
        }
        let uniqueToken = UserService_1.getHexString(32);
        while (await this.getUserByParam({ email, emailConfirmCode: uniqueToken })) {
            uniqueToken = UserService_1.getHexString(32);
        }
        await this.user.update(currentUser.id, {
            emailConfirmCode: uniqueToken
        });
        this.mailerService.sendMail(email, MailTypes.CONFIRM_EMAIL, uniqueToken);
    }
    async confirmEmail(code) {
        const currentUser = await this.getUserByParam({ emailConfirmCode: code });
        if (!currentUser) {
            throw new common_1.NotFoundException();
        }
        await this.user.update(currentUser.id, {
            emailConfirmAt: new Date()
        });
    }
    async getLinkForChangeEmail(id, email) {
        const currentUser = await this.getUserByParam({ id });
        if (!currentUser) {
            throw new common_1.NotFoundException();
        }
        if (currentUser.emailChangeRequestedAt) {
            const minutesSinceLastRequest = Math.floor((new Date().getTime() - currentUser.emailChangeRequestedAt.getTime()) / 1000 / 60);
            const minutesLastEmailChangeRequest = process.env.MINUTES_FROM_LAST_CHANGE_REQUEST;
            if (minutesSinceLastRequest < minutesLastEmailChangeRequest) {
                throw new http_exceptions_1.TooManyRequest();
            }
        }
        let uniqueToken = UserService_1.getHexString(32);
        while (await this.getUserByParam({ id, emailChangeCode: uniqueToken })) {
            uniqueToken = UserService_1.getHexString(32);
        }
        await this.user.update(id, {
            emailChangeAddress: email,
            emailChangeCode: uniqueToken,
            emailChangeRequestedAt: () => 'CURRENT_TIMESTAMP'
        });
        this.mailerService.sendMail(email, MailTypes.CHANGE_EMAIL, uniqueToken);
    }
    async getUserByParam(param) {
        return await this.user.findOne({ where: param });
    }
    async confirmChangeEmail(code) {
        const currentUser = await this.getUserByParam({ emailChangeCode: code });
        if (!currentUser) {
            throw new common_1.NotFoundException();
        }
        await this.user.update({ emailChangeCode: code }, {
            email: () => 'email_change_address',
            emailChangeAddress: null,
            emailChangeCode: null
        });
    }
    async getLinkForChangePassword(email) {
        const currentUser = await this.getUserByParam({ email });
        if (!currentUser) {
            throw new common_1.NotFoundException();
        }
        if (currentUser.passwordResetRequestedAt) {
            const minutesSinceLastRequest = Math.floor((new Date().getTime() - currentUser.passwordResetRequestedAt.getTime()) / 1000 / 60);
            const minutesLastPasswordChangeRequest = process.env.MINUTES_FROM_LAST_CHANGE_REQUEST;
            if (minutesSinceLastRequest < minutesLastPasswordChangeRequest) {
                throw new http_exceptions_1.TooManyRequest();
            }
        }
        let uniqueToken = UserService_1.getHexString(32);
        while (await this.getUserByParam({ email, passwordResetCode: uniqueToken })) {
            uniqueToken = UserService_1.getHexString(32);
        }
        await this.user.update(currentUser.id, {
            passwordResetCode: uniqueToken,
            passwordResetRequestedAt: new Date()
        });
        this.mailerService.sendMail(email, MailTypes.CHANGE_PASSWORD, uniqueToken);
    }
    async confirmChangePassword(data, code) {
        const currentUser = await this.getUserByParam({ passwordResetCode: code });
        if (!currentUser) {
            throw new common_1.NotFoundException();
        }
        return this.user.update({ passwordResetCode: code }, {
            password: await UserService_1.getPasswordHash(data.password),
            passwordResetCode: null
        });
    }
};
UserService = UserService_1 = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(user_entity_1.UsersEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map