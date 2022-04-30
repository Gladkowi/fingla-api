import { EventEntity } from "./event.entity";
import { UserEntity } from "../user/user.entity";
import { GroupEntity } from "./group.entity";
import { CategoryTypeEnum } from "../realization/main/types/categoryType.enum";
export declare class CategoryEntity {
    id: number;
    events: EventEntity[];
    user: UserEntity;
    group: GroupEntity;
    name: string;
    limit: number;
    color: string;
    type: CategoryTypeEnum;
}
