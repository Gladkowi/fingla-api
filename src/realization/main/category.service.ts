import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "../../entities/category.entity";
import { Repository } from "typeorm";
import { CategoryRegTypes } from "./types/categoryRegTypes";
import { RegistrationRespModel } from "../../user/response.class";
import { CategoryClass } from "./types/category.class";
import { CategoryTypeEnum } from "./types/categoryType.enum";

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(CategoryEntity) private category: Repository<CategoryEntity>) {
    }

    public async validateCategory(category: CategoryRegTypes): Promise<string> {
        if (!category.name) {
            return 'name can\'t be empty';
        }
        if (!category.type) {
            return 'type can\'t be empty';
        }
        return '';
    }

    public async create(id: number, category: CategoryRegTypes): Promise<any> {
        const result = new RegistrationRespModel();
        const newCategory = new CategoryClass();
        newCategory.groupId = category.groupId;
        newCategory.userId = id;
        newCategory.name = category.name;
        newCategory.limit = category.limit;
        newCategory.color = category.color;
        newCategory.type = CategoryTypeEnum.expense;
        // @ts-ignore
        await this.category.insert(newCategory);
        result.successStatus = true;
        result.message = 'Success';
        return result;
    }

    public async getCategory(id: number): Promise<any> {
        const result = new RegistrationRespModel();
        const events = await this.category.findOne(id, {relations: ['events']});
        result.successStatus = true;
        result.message = 'Success';
        result.data = events;
        return result;
    }

    public async getCategories(): Promise<any> {
        const result = new RegistrationRespModel();
        const categories = await this.category.find();
        result.successStatus = true;
        result.message = 'Success';
        result.data = categories;
        return result;
    }
}