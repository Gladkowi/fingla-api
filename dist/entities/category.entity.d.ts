import { EventEntity } from "./event.entity";
import { UsersEntity } from "./user.entity";
import { GroupEntity } from "./group.entity";
import { CategoryTypeEnum } from "../realization/main/types/categoryType.enum";
export declare class CategoryEntity {
    id: number;
    events: EventEntity[];
    user: UsersEntity;
    group: GroupEntity;
    name: string;
    limit: number;
    color: string;
    type: CategoryTypeEnum;
}
