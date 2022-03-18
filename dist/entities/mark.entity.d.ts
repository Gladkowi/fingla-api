import { EventEntity } from "./event.entity";
import { UsersEntity } from "./user.entity";
export declare class MarkEntity {
    id: number;
    events: EventEntity[];
    user: UsersEntity;
    name: string;
}
