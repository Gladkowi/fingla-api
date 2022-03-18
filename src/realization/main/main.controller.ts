import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, UseGuards } from "@nestjs/common";
import { EventService } from "./event.service";
import { EventRegType } from "./types/eventRegType";
import { RegistrationRespModel } from "../../user/response.class";
import { AuthGuard } from "@nestjs/passport";
import { CategoryService } from "./category.service";
import { CategoryRegTypes } from "./types/categoryRegTypes";

@Controller()
export class MainController {
    constructor(private eventService: EventService, private categoryService: CategoryService) {
    }

    @Post('event')
    @UseGuards(AuthGuard('jwt'))
    async createEvent(@Req() req, @Body() newEvent: EventRegType): Promise<RegistrationRespModel> {
        const errorMessage = await this.eventService.validateEvent(newEvent);
        if (errorMessage) {
            throw new HttpException(
                errorMessage,
                HttpStatus.BAD_REQUEST,
            );
        }
        const errorAccess = await this.eventService.validateAccess(req.user.id, newEvent.categoryId, newEvent.markId);
        if (errorAccess) {
            throw new HttpException(
                `${errorAccess}`,
                HttpStatus.NOT_FOUND,
            );
        }
        return await this.eventService.create(newEvent);
    }

    @Post('category')
    @UseGuards(AuthGuard('jwt'))
    async createCategory(@Req() req, @Body() newCategory: CategoryRegTypes): Promise<RegistrationRespModel> {
        const errorMessage = await this.categoryService.validateCategory(newCategory);
        if (errorMessage) {
            throw new HttpException(
                errorMessage,
                HttpStatus.BAD_REQUEST,
            );
        }
        return await this.categoryService.create(req.user.id, newCategory);
    }

    @Get('category/:id')
    @UseGuards(AuthGuard('jwt'))
    async getCategory(@Req() req, @Param() id: number): Promise<any> {
        return await this.categoryService.getCategory(id);
    }

    @Get('categories')
    @UseGuards(AuthGuard('jwt'))
    async getCategories(@Req() req): Promise<any> {
        return await this.categoryService.getCategories();
    }

    @Get('events')
    @UseGuards(AuthGuard('jwt'))
    async getEvents(@Req() req): Promise<any> {
        return await this.eventService.getEvents();
    }

    @Post('gant')
    @UseGuards(AuthGuard('jwt'))
    async gant(@Req() req, @Body() time: {start: Date, end: Date}): Promise<any> {
        try {
            return await this.eventService.gant(req.user.id, time);
        } catch (e){
            throw new HttpException(`${e}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}