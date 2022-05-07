import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CategoryTypeEnum } from '../enums/category-type.enum';

export class UpdateCategoryDto {
  @ApiModelProperty()
  @IsString()
  @IsOptional()
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
  @IsOptional()
  type: CategoryTypeEnum;

  @ApiModelProperty()
  @IsString()
  @IsOptional()
  color: string;
}

export class UpdateSubCategoryDto {
  @ApiModelProperty()
  @IsString()
  @IsOptional()
  name: string;

  preview: string | null;

  @ApiModelProperty()
  @IsOptional()
  categoryId: number;

  @ApiModelProperty()
  @IsNumber()
  @IsOptional()
  limit: number;
}
