import { CategoryTypeEnum } from "./categoryType.enum";

export class CategoryClass {
    groupId?: number;
    userId: number;
    name: string;
    limit?: number;
    color: string;
    type: CategoryTypeEnum;
}