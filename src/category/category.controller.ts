import {
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CategoryService } from "./category.service";

@ApiTags('Category')
@Controller()
export class CategoryController {
    constructor(
      private categoryService: CategoryService
    ) { }
    
    @Post('category')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    createCategory() {
        
    }
    
    @Get('categories')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    getListCategories() {

    }

    @Get('category/:categoryId')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    getCategory(
      @Param('categoryId', ParseIntPipe) id: number
    ) {

    }

    @Patch('category/:categoryId')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    updateCategory(
      @Param('categoryId', ParseIntPipe) id: number
    ) {

    }

    @Delete('category/:categoryId')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    deleteCategory(
      @Param('categoryId', ParseIntPipe) id: number
    ) {

    }
}
