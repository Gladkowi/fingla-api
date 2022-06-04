import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CategoryTypeEnum } from '../enums/category-type.enum';

export class CreateCategoryDto {
  @ApiModelProperty()
  @IsString()
  name: string;

  preview: string | null;

  @ApiModelProperty()
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiModelProperty({
    type: Object.keys(CategoryTypeEnum),
    example: CategoryTypeEnum.EXPENSE
  })
  @IsEnum(CategoryTypeEnum)
  type: CategoryTypeEnum;

  @ApiModelProperty()
  @IsString()
  @IsOptional()
  color: string;

  userId: number;
}

export class CreateSubCategoryDto {
  @ApiModelProperty()
  @IsString()
  name: string;

  preview: string | null;

  @ApiModelProperty()
  @IsNumber()
  categoryId: number;

  @ApiModelProperty()
  @IsNumber()
  @IsOptional()
  limit: number;
}
