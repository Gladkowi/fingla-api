import { CategoryEntity } from "../../entities/category.entity";
import { Repository } from "typeorm";
import { CategoryRegTypes } from "./types/categoryRegTypes";
export declare class CategoryService {
    private category;
    constructor(category: Repository<CategoryEntity>);
    validateCategory(category: CategoryRegTypes): Promise<string>;
    create(id: number, category: CategoryRegTypes): Promise<any>;
    getCategory(id: number): Promise<any>;
    getCategories(): Promise<any>;
}
