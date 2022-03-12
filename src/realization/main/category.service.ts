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
    constructor(@InjectRepository(CategoryEntity) private category: Repository<CategoryEntity>) {}

    public async validateCategory(category: CategoryRegTypes) : Promise<string> {
        if(!category.userId){
            return 'userId can\'t be empty';
        }
        if(!category.name){
            return 'name can\'t be empty';
        }
        if(!category.type){
            return 'type can\'t be empty';
        }
        return '';
    }

    public async create(category: CategoryRegTypes): Promise<RegistrationRespModel> {
        const result = new RegistrationRespModel();
        try {
            const newCategory = new CategoryClass();
            newCategory.group = category.groupId;
            newCategory.user = category.userId;
            newCategory.name = category.name;
            newCategory.limit = category.limit;
            newCategory.color = category.color;
            newCategory.type = CategoryTypeEnum.expense;
            // @ts-ignore
            await this.category.insert(newCategory);
            result.successStatus = true;
            result.message = 'Success';
            return result;
        } catch (e) {
            result.successStatus = false;
            result.message = e;
            return result;
        }
    }
}