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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupEntity = void 0;
const typeorm_1 = require("typeorm");
const category_entity_1 = require("./category.entity");
let GroupEntity = class GroupEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], GroupEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToMany(() => category_entity_1.CategoryEntity, categories => categories.group),
    __metadata("design:type", Array)
], GroupEntity.prototype, "categories", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], GroupEntity.prototype, "name", void 0);
GroupEntity = __decorate([
    typeorm_1.Entity('groups')
], GroupEntity);
exports.GroupEntity = GroupEntity;
//# sourceMappingURL=group.entity.js.map