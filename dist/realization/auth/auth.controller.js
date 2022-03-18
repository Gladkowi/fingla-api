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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const passport_1 = require("@nestjs/passport");
const registration_class_1 = require("../../user/registration.class");
const response_class_1 = require("../../user/response.class");
let AuthController = class AuthController {
    constructor(userService) {
        this.userService = userService;
    }
    async registerUser(reg) {
        const result = new response_class_1.RegistrationRespModel();
        const user = await this.userService.registerUser(reg);
        const token = await this.userService.getJwtToken(user);
        result.successStatus = true;
        result.message = 'Success';
        result.data = {
            user: user,
            token: token,
        };
        return result;
    }
    async login(req, res) {
        const result = new response_class_1.RegistrationRespModel();
        const token = await this.userService.getJwtToken(req.user);
        result.successStatus = true;
        result.message = 'Success';
        result.data = {
            user: req.user,
            token: token,
        };
        return result;
    }
};
__decorate([
    common_1.Post('signup'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registration_class_1.RegistrationReqModel]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    common_1.Post('login'),
    common_1.HttpCode(200),
    common_1.UseGuards(passport_1.AuthGuard('local')),
    __param(0, common_1.Req()), __param(1, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map