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
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const event_entity_1 = require("../../entities/event.entity");
const typeorm_2 = require("typeorm");
const mark_entity_1 = require("../../entities/mark.entity");
const response_class_1 = require("../../user/response.class");
const event_class_1 = require("./types/event.class");
const category_entity_1 = require("../../entities/category.entity");
let EventService = class EventService {
    constructor(event, mark, category) {
        this.event = event;
        this.mark = mark;
        this.category = category;
    }
    async validateEvent(event) {
        if (!event.categoryId) {
            return 'categoryId can\'t be empty';
        }
        if (!event.value) {
            return 'value can\'t be empty';
        }
        return '';
    }
    async validateAccess(userId, categoryId, markId) {
        const category = await this.category.findOne(categoryId, { relations: ['user'] });
        const mark = await this.mark.findOne(markId, { relations: ['user'] });
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
    }
    async create(event) {
        const result = new response_class_1.RegistrationRespModel();
        const newEvent = new event_class_1.EventClass();
        newEvent.category = event.categoryId;
        newEvent.mark = event.markId;
        newEvent.comment = event.comment;
        newEvent.value = event.value;
        newEvent.date = event.date ? event.date : new Date();
        await this.event.insert(newEvent);
        result.successStatus = true;
        result.message = 'Success';
        return result;
    }
    async getEvents() {
        const result = new response_class_1.RegistrationRespModel();
        const events = await this.event.find({ take: 50 });
        result.successStatus = true;
        result.message = 'Success';
        result.data = events;
        return result;
    }
    async gant(id, time) {
        const result = new response_class_1.RegistrationRespModel();
        const gant = await this.category.query(`SELECT *, (SELECT SUM(value) FROM events WHERE events."categoryId" = categories.id) AS value FROM categories WHERE categories."userId" = ${id}`);
        result.successStatus = true;
        result.message = 'Success';
        result.data = gant;
        return result;
    }
};
EventService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(event_entity_1.EventEntity)),
    __param(1, typeorm_1.InjectRepository(mark_entity_1.MarkEntity)),
    __param(2, typeorm_1.InjectRepository(category_entity_1.CategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EventService);
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map