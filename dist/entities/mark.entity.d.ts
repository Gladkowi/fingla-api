import { EventEntity } from "./event.entity";
import { UserEntity } from "../user/user.entity";
export declare class MarkEntity {
    id: number;
    events: EventEntity[];
    user: UserEntity;
    name: string;
}
