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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("../../entities/category.entity");
const typeorm_2 = require("typeorm");
const response_class_1 = require("../../user/response.class");
const category_class_1 = require("./types/category.class");
const categoryType_enum_1 = require("./types/categoryType.enum");
let CategoryService = class CategoryService {
    constructor(category) {
        this.category = category;
    }
    async validateCategory(category) {
        if (!category.name) {
            return 'name can\'t be empty';
        }
        if (!category.type) {
            return 'type can\'t be empty';
        }
        return '';
    }
    async create(id, category) {
        const result = new response_class_1.RegistrationRespModel();
        const newCategory = new category_class_1.CategoryClass();
        newCategory.groupId = category.groupId;
        newCategory.userId = id;
        newCategory.name = category.name;
        newCategory.limit = category.limit;
        newCategory.color = category.color;
        newCategory.type = categoryType_enum_1.CategoryTypeEnum.expense;
        await this.category.insert(newCategory);
        result.successStatus = true;
        result.message = 'Success';
        return result;
    }
    async getCategory(id) {
        const result = new response_class_1.RegistrationRespModel();
        const events = await this.category.findOne(id, { relations: ['events'] });
        result.successStatus = true;
        result.message = 'Success';
        result.data = events;
        return result;
    }
    async getCategories() {
        const result = new response_class_1.RegistrationRespModel();
        const categories = await this.category.find();
        result.successStatus = true;
        result.message = 'Success';
        result.data = categories;
        return result;
    }
};
CategoryService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(category_entity_1.CategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map