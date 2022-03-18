import { EventEntity } from "../../entities/event.entity";
import { Repository } from "typeorm";
import { MarkEntity } from "../../entities/mark.entity";
import { EventRegType } from "./types/eventRegType";
import { CategoryEntity } from "../../entities/category.entity";
export declare class EventService {
    private event;
    private mark;
    private category;
    constructor(event: Repository<EventEntity>, mark: Repository<MarkEntity>, category: Repository<CategoryEntity>);
    validateEvent(event: EventRegType): Promise<string>;
    validateAccess(userId: number, categoryId: number, markId?: number): Promise<string>;
    create(event: EventRegType): Promise<any>;
    getEvents(): Promise<any>;
    gant(id: number, time: {
        start: Date;
        end: Date;
    }): Promise<any>;
}
