import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { DiagramEnum } from './enums/diagram.enum';

@ApiTags('Category')
@Controller()
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
  ) {
  }

  @Post('category')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  createCategory() {

  }

  @Post('category/:categoryId/subcategory')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  createSubCategory(
    @Param('categoryId', ParseIntPipe) id: number,
  ) {

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
    @Param('categoryId', ParseIntPipe) id: number,
  ) {

  }

  @Get('category/:categoryId/subcategory')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getSubCategory(
    @Param('categoryId', ParseIntPipe) id: number,
  ) {

  }

  @Patch('category/:categoryId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  updateCategory(
    @Param('categoryId', ParseIntPipe) id: number,
  ) {

  }

  @Patch('category/:categoryId/subcategory')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  updateSubCategory(
    @Param('categoryId', ParseIntPipe) id: number,
  ) {

  }

  @Delete('category/:categoryId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  deleteCategory(
    @Param('categoryId', ParseIntPipe) id: number,
  ) {

  }

  @Delete('category/:categoryId/subcategory')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  deleteSubCategory(
    @Param('categoryId', ParseIntPipe) id: number,
  ) {

  }

  @Get('category/diagram/:type')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getDiagram(
    @Param('type') type: DiagramEnum,
  ) {

  }
}
