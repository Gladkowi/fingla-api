import { EventService } from "./event.service";
import { EventRegType } from "./types/eventRegType";
import { RegistrationRespModel } from "../../user/response.class";
import { CategoryService } from "./category.service";
import { CategoryRegTypes } from "./types/categoryRegTypes";
export declare class MainController {
    private eventService;
    private categoryService;
    constructor(eventService: EventService, categoryService: CategoryService);
    createEvent(req: any, newEvent: EventRegType): Promise<RegistrationRespModel>;
    createCategory(req: any, newCategory: CategoryRegTypes): Promise<RegistrationRespModel>;
    getCategory(req: any, id: number): Promise<any>;
    getCategories(req: any): Promise<any>;
    getEvents(req: any): Promise<any>;
    gant(req: any, time: {
        start: Date;
        end: Date;
    }): Promise<any>;
}
