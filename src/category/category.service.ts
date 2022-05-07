import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';
import { SubCategoryEntity } from './subCategory.entity';
import {
  CategoryResponseDto,
  CategoryResponsePaginationDto,
  SubCategoryResponseDto,
} from './dtos/responses.dto';
import { PaginationDto } from '../core/dtos/pagination.dto';
import {
  CreateCategoryDto,
  CreateSubCategoryDto,
} from './dtos/create-category.dto';
import { UpdateCategoryDto, UpdateSubCategoryDto } from './dtos/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private category: Repository<CategoryEntity>,
    @InjectRepository(SubCategoryEntity)
    private subCategory: Repository<SubCategoryEntity>,
  ) {
  }

  async getListCategory(
    userId: number,
    paginate: PaginationDto,
  ): Promise<CategoryResponsePaginationDto> {
    const [items, count] = await this.category.findAndCount({
      take: paginate.limit,
      skip: paginate.offset,
      relations: ['subCategories'],
      where: {
        userId,
      },
    });

    return {
      items,
      count,
    };
  }

  getListCategoryWithSum(userId: number, paginate: PaginationDto) {
    return this.category
    .createQueryBuilder('c')
    .select([
      'c.id AS id',
      'c.name AS name',
      'c.preview AS preview',
      'c.color AS color'
    ])
    .addSelect('SUM(e.sum)', 'value')
    .leftJoin('c.events', 'e')
    .where('user_id = :id', {
      id: userId,
    })
    .limit(paginate.limit)
    .offset(paginate.offset)
    .groupBy('c.id')
    .getRawMany();
  }

  getSubCategory(id: number): Promise<SubCategoryResponseDto> {
    return this.subCategory.findOneOrFail(id);
  }

  getCategory(id: number): Promise<CategoryResponseDto> {
    return this.category.findOneOrFail(id, {
      relations: ['subCategory'],
    });
  }

  createCategory(
    body: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    return this.category.save(body);
  }

  createSubCategory(
    body: CreateSubCategoryDto,
  ): Promise<SubCategoryResponseDto> {
    return this.subCategory.save(body);
  }

  async updateCategory(id: number, body: UpdateCategoryDto) {
    await this.category.update(id, body);
  }

  async updateSubCategory(id: number, body: UpdateSubCategoryDto) {
    await this.subCategory.update(id, body);
  }

  async deleteCategory(id: number) {
    await this.category.delete(id);
  }

  async deleteSubCategory(id: number) {
    await this.subCategory.delete(id);
  }
}
