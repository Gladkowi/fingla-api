"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const event_service_1 = require("./event.service");
const main_controller_1 = require("./main.controller");
const event_entity_1 = require("../../entities/event.entity");
const mark_entity_1 = require("../../entities/mark.entity");
const group_entity_1 = require("../../entities/group.entity");
const category_entity_1 = require("../../entities/category.entity");
const category_service_1 = require("./category.service");
let MainModule = class MainModule {
};
MainModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([event_entity_1.EventEntity, mark_entity_1.MarkEntity, group_entity_1.GroupEntity, category_entity_1.CategoryEntity])
        ],
        providers: [event_service_1.EventService, category_service_1.CategoryService],
        controllers: [main_controller_1.MainController],
        exports: [event_service_1.EventService, category_service_1.CategoryService]
    })
], MainModule);
exports.MainModule = MainModule;
//# sourceMappingURL=main.module.js.map