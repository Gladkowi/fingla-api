import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EventEntity } from "../../entities/event.entity";
import { Repository } from "typeorm";
import { MarkEntity } from "../../entities/mark.entity";
import { EventRegType } from "./types/eventRegType";
import { RegistrationRespModel } from "../../user/response.class";
import { EventClass } from "./types/event.class";
import { CategoryEntity } from "../../entities/category.entity";

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(EventEntity) private event: Repository<EventEntity>,
        @InjectRepository(MarkEntity) private mark: Repository<MarkEntity>,
        @InjectRepository(CategoryEntity) private category: Repository<CategoryEntity>
    ) {}

    public async validateEvent(event: EventRegType): Promise<string>  {
        if(!event.categoryId){
            return 'categoryId can\'t be empty';
        }
        if(!event.value){
            return 'value can\'t be empty';
        }
        return '';
    }

    public async validateAccess(userId: number, categoryId: number, markId?: number): Promise<string> {
        const category = await this.category.findOne(categoryId, {relations: ['user']});
        const mark = await this.mark.findOne(markId, {relations: ['user']});
        if(!category) {
            return 'Not Found 1';
        }
        if(!mark && markId) {
            return 'Not Found 2';
        }
        if(category.user.id !== userId || (mark && mark.user.id !== userId)) {
            return 'Not Found 3';
        }
        return ''
    }

    public async create(event: EventRegType): Promise<RegistrationRespModel> {
        const result = new RegistrationRespModel();
        try {
            const newEvent = new EventClass();
            newEvent.category = event.categoryId;
            newEvent.mark = event.markId;
            newEvent.comment = event.comment;
            newEvent.value = event.value;
            newEvent.date = event.date ? event.date : new Date();
            // @ts-ignore
            await this.event.insert(newEvent);
            result.successStatus = true;
            result.message = 'Success';
            return result;
        } catch (e) {
            result.successStatus = false;
            result.message = e;
            return result;
        }
    }
}