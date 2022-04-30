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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const event_entity_1 = require("../../entities/event.entity");
const typeorm_2 = require("typeorm");
const mark_entity_1 = require("../../entities/mark.entity");
const category_entity_1 = require("../../entities/category.entity");
const user_entity_1 = require("../../user/user.entity");
let EventService = class EventService {
    constructor(user, event, mark, category) {
        this.user = user;
        this.event = event;
        this.mark = mark;
        this.category = category;
    }
    validateEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!event.categoryId) {
                return 'categoryId can\'t be empty';
            }
            if (!event.value) {
                return 'value can\'t be empty';
            }
            return '';
        });
    }
    validateAccess(userId, categoryId, markId) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.category.findOne(categoryId, { relations: ['user'] });
            const mark = yield this.mark.findOne(markId, { relations: ['user'] });
            if (!category) {
                return 'Not Found 1';
            }
            if (!mark && markId) {
                return 'Not Found 2';
            }
            if (category.user.id !== userId || (mark && mark.user.id !== userId)) {
                return 'Not Found 3';
            }
            return '';
        });
    }
    create(userId, event) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    getEvents() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    gant(id, time) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
EventService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __param(1, typeorm_1.InjectRepository(event_entity_1.EventEntity)),
    __param(2, typeorm_1.InjectRepository(mark_entity_1.MarkEntity)),
    __param(3, typeorm_1.InjectRepository(category_entity_1.CategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EventService);
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map