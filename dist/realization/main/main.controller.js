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
exports.MainController = void 0;
const common_1 = require("@nestjs/common");
const event_service_1 = require("./event.service");
const eventRegType_1 = require("./types/eventRegType");
const passport_1 = require("@nestjs/passport");
const category_service_1 = require("./category.service");
const categoryRegTypes_1 = require("./types/categoryRegTypes");
let MainController = class MainController {
    constructor(eventService, categoryService) {
        this.eventService = eventService;
        this.categoryService = categoryService;
    }
    async createEvent(req, newEvent) {
        const errorMessage = await this.eventService.validateEvent(newEvent);
        if (errorMessage) {
            throw new common_1.HttpException(errorMessage, common_1.HttpStatus.BAD_REQUEST);
        }
        const errorAccess = await this.eventService.validateAccess(req.user.id, newEvent.categoryId, newEvent.markId);
        if (errorAccess) {
            throw new common_1.HttpException(`${errorAccess}`, common_1.HttpStatus.NOT_FOUND);
        }
        return await this.eventService.create(newEvent);
    }
    async createCategory(req, newCategory) {
        const errorMessage = await this.categoryService.validateCategory(newCategory);
        if (errorMessage) {
            throw new common_1.HttpException(errorMessage, common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.categoryService.create(req.user.id, newCategory);
    }
    async getCategory(req, id) {
        return await this.categoryService.getCategory(id);
    }
    async getCategories(req) {
        return await this.categoryService.getCategories();
    }
    async getEvents(req) {
        return await this.eventService.getEvents();
    }
    async gant(req, time) {
        try {
            return await this.eventService.gant(req.user.id, time);
        }
        catch (e) {
            throw new common_1.HttpException(`${e}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    common_1.Post('event'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, eventRegType_1.EventRegType]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "createEvent", null);
__decorate([
    common_1.Post('category'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, categoryRegTypes_1.CategoryRegTypes]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "createCategory", null);
__decorate([
    common_1.Get('category/:id'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Req()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "getCategory", null);
__decorate([
    common_1.Get('categories'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "getCategories", null);
__decorate([
    common_1.Get('events'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "getEvents", null);
__decorate([
    common_1.Post('gant'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "gant", null);
MainController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [event_service_1.EventService, category_service_1.CategoryService])
], MainController);
exports.MainController = MainController;
//# sourceMappingURL=main.controller.js.map