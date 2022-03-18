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
exports.UsersEntity = void 0;
const typeorm_1 = require("typeorm");
const role_enum_1 = require("../user/role.enum");
const category_entity_1 = require("./category.entity");
const mark_entity_1 = require("./mark.entity");
let UsersEntity = class UsersEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], UsersEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToMany(() => category_entity_1.CategoryEntity, categories => categories.user),
    __metadata("design:type", Array)
], UsersEntity.prototype, "categories", void 0);
__decorate([
    typeorm_1.OneToMany(() => mark_entity_1.MarkEntity, marks => marks.user),
    __metadata("design:type", Array)
], UsersEntity.prototype, "marks", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UsersEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], UsersEntity.prototype, "account", void 0);
__decorate([
    typeorm_1.Column({ unique: true, nullable: true }),
    __metadata("design:type", String)
], UsersEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], UsersEntity.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UsersEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ type: 'enum', enum: role_enum_1.Role, default: role_enum_1.Role.USER }),
    __metadata("design:type", String)
], UsersEntity.prototype, "role", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], UsersEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], UsersEntity.prototype, "updatedAt", void 0);
UsersEntity = __decorate([
    typeorm_1.Entity('users')
], UsersEntity);
exports.UsersEntity = UsersEntity;
//# sourceMappingURL=user.entity.js.map