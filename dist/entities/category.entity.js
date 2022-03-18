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
exports.CategoryEntity = void 0;
const typeorm_1 = require("typeorm");
const event_entity_1 = require("./event.entity");
const user_entity_1 = require("./user.entity");
const group_entity_1 = require("./group.entity");
const categoryType_enum_1 = require("../realization/main/types/categoryType.enum");
let CategoryEntity = class CategoryEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CategoryEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToMany(() => event_entity_1.EventEntity, event => event.category),
    __metadata("design:type", Array)
], CategoryEntity.prototype, "events", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.UsersEntity, user => user.categories),
    __metadata("design:type", user_entity_1.UsersEntity)
], CategoryEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(() => group_entity_1.GroupEntity, group => group.categories, { nullable: true }),
    __metadata("design:type", group_entity_1.GroupEntity)
], CategoryEntity.prototype, "group", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CategoryEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], CategoryEntity.prototype, "limit", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CategoryEntity.prototype, "color", void 0);
__decorate([
    typeorm_1.Column({ type: 'enum', enum: categoryType_enum_1.CategoryTypeEnum }),
    __metadata("design:type", Number)
], CategoryEntity.prototype, "type", void 0);
CategoryEntity = __decorate([
    typeorm_1.Entity('categories')
], CategoryEntity);
exports.CategoryEntity = CategoryEntity;
//# sourceMappingURL=category.entity.js.map