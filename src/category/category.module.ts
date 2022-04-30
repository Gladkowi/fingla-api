import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryController } from "./category.controller";
import { CategoryEntity } from "./category.entity";
import { CategoryService } from "./category.service";
import { UserEntity } from '../user/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
          CategoryEntity,
            UserEntity
        ])
    ],
    providers: [CategoryService],
    controllers: [CategoryController],
    exports: [CategoryService]
})
export class CategoryModule {}
