import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { DiagramEnum } from './enums/diagram.enum';
import { PaginationDto } from '../core/dtos/pagination.dto';
import {
  CategoryResponseDto,
  CategoryResponsePaginationDto,
  SubCategoryResponseDto,
} from './dtos/responses.dto';
import {
  CreateCategoryDto,
  CreateSubCategoryDto,
} from './dtos/create-category.dto';
import {
  UpdateCategoryDto,
  UpdateSubCategoryDto,
} from './dtos/update-category.dto';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveFileToStorage } from '../core/storage';
import { User } from '../user/decorators/user.decorator';
import { DiagramDto } from './dtos/diagram.dto';

@ApiTags('Category')
@Controller()
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
  ) {
  }

  @Get('categories')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: CategoryResponsePaginationDto,
  })
  @UseGuards(AuthGuard('jwt'))
  getListCategories(
    @User('id') userId: number,
    @Query() paginate: PaginationDto,
  ): Promise<CategoryResponsePaginationDto> {
    return this.categoryService.getListCategory(userId, paginate);
  }

  @Get('categories/diagram')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getListCategoriesForDiagram(
    @User('id') userId: number,
    @Query() paginate: PaginationDto,
    @Query() query: DiagramDto
  ) {
    return this.categoryService.getListCategoryWithSum(userId, paginate, query);
  }

  @Get('category/:categoryId')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: CategoryResponseDto,
  })
  @UseGuards(AuthGuard('jwt'))
  getCategory(
    @Param('categoryId', ParseIntPipe) id: number,
  ): Promise<CategoryResponseDto> {
    return this.categoryService.getCategory(id);
  }

  @Get('subcategory/:subCategoryId')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: SubCategoryResponseDto,
  })
  @UseGuards(AuthGuard('jwt'))
  getSubCategory(
    @Param('subCategoryId', ParseIntPipe) id: number,
  ): Promise<SubCategoryResponseDto> {
    return this.categoryService.getSubCategory(id);
  }

  @Post('category')
  @ApiBearerAuth()
  @ApiImplicitFile({
    name: 'preview',
    required: false,
  })
  @UseInterceptors(FileInterceptor('preview', saveFileToStorage))
  @ApiOkResponse({
    type: CategoryResponseDto,
  })
  @UseGuards(AuthGuard('jwt'))
  createCategory(
    @User('id') userId: number,
    @Body() body: CreateCategoryDto,
    @UploadedFile() preview,
  ): Promise<CategoryResponseDto> {
    if (preview) {
      body.preview = preview.filename;
    }
    body.userId = userId;
    return this.categoryService.createCategory(body);
  }

  @Post('subcategory')
  @ApiBearerAuth()
  @ApiImplicitFile({
    name: 'preview',
    required: false,
  })
  @UseInterceptors(FileInterceptor('preview', saveFileToStorage))
  @ApiOkResponse({
    type: SubCategoryResponseDto,
  })
  @UseGuards(AuthGuard('jwt'))
  createSubCategory(
    @Body() body: CreateSubCategoryDto,
    @UploadedFile() preview,
  ): Promise<SubCategoryResponseDto> {
    if (preview) {
      body.preview = preview.filename;
    }
    return this.categoryService.createSubCategory(body);
  }

  @Patch('category/:categoryId')
  @ApiBearerAuth()
  @ApiImplicitFile({
    name: 'preview',
    required: false,
  })
  @UseInterceptors(FileInterceptor('preview', saveFileToStorage))
  @UseGuards(AuthGuard('jwt'))
  updateCategory(
    @Param('categoryId', ParseIntPipe) id: number,
    @Body() body: UpdateCategoryDto,
    @UploadedFile() preview,
  ) {
    if (preview) {
      body.preview = preview.filename;
    }
    return this.categoryService.updateCategory(id, body);
  }

  @Patch('subcategory/:subCategoryId')
  @ApiBearerAuth()
  @ApiImplicitFile({
    name: 'preview',
    required: false,
  })
  @UseInterceptors(FileInterceptor('preview', saveFileToStorage))
  @UseGuards(AuthGuard('jwt'))
  updateSubCategory(
    @Param('subCategoryId', ParseIntPipe) id: number,
    @Body() body: UpdateSubCategoryDto,
    @UploadedFile() preview,
  ) {
    if (preview) {
      body.preview = preview.filename;
    }
    return this.categoryService.updateSubCategory(id, body);
  }

  @Delete('category/:categoryId')
  @HttpCode(204)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  deleteCategory(
    @Param('categoryId', ParseIntPipe) id: number,
  ) {
    return this.categoryService.deleteCategory(id);
  }

  @Delete('subcategory/:subCategoryId')
  @ApiBearerAuth()
  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  deleteSubCategory(
    @Param('subCategoryId', ParseIntPipe) id: number,
  ) {
    return this.categoryService.deleteSubCategory(id);
  }

  @Get('category/diagram/:type')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getDiagram(
    @Param('type') type: DiagramEnum,
  ) {

  }
}
