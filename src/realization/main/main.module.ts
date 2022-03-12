import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventService } from "./event.service";
import { MainController } from "./main.controller";
import { EventEntity } from "../../entities/event.entity";
import { MarkEntity } from "../../entities/mark.entity";
import { GroupEntity } from "../../entities/group.entity";
import { CategoryEntity } from "../../entities/category.entity";
import { CategoryService } from "./category.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([EventEntity, MarkEntity, GroupEntity, CategoryEntity])
    ],
    providers: [EventService, CategoryService],
    controllers: [MainController],
    exports: [EventService, CategoryService]
})
export class MainModule {}