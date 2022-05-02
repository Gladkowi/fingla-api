import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "./category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {
    constructor(
      @InjectRepository(CategoryEntity) private category: Repository<CategoryEntity>
    ) { }
    
}
