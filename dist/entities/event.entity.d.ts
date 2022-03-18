import { CategoryEntity } from "./category.entity";
import { MarkEntity } from "./mark.entity";
export declare class EventEntity {
    id: number;
    category: CategoryEntity;
    mark: MarkEntity;
    comment: string;
    value: number;
    date: Date;
}
