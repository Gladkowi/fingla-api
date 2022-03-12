import { CategoryTypeEnum } from "./categoryType.enum";

export class CategoryClass {
    group?: number;
    user: number;
    name: string;
    limit?: number;
    color: string;
    type: CategoryTypeEnum;
}