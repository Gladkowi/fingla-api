import { EventEntity } from "../../entities/event.entity";
import { Repository } from "typeorm";
import { MarkEntity } from "../../entities/mark.entity";
import { EventRegType } from "./types/eventRegType";
import { CategoryEntity } from "../../entities/category.entity";
import { UserEntity } from "../../user/user.entity";
export declare class EventService {
    private user;
    private event;
    private mark;
    private category;
    constructor(user: Repository<UserEntity>, event: Repository<EventEntity>, mark: Repository<MarkEntity>, category: Repository<CategoryEntity>);
    validateEvent(event: EventRegType): Promise<string>;
    validateAccess(userId: number, categoryId: number, markId?: number): Promise<string>;
    create(userId: number, event: EventRegType): Promise<any>;
    getEvents(): Promise<any>;
    gant(id: number, time: {
        start: Date;
        end: Date;
    }): Promise<any>;
}
