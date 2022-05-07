import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNumber, IsOptional } from 'class-validator';

export class CategoryResponseDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  name: string;

  @ApiModelProperty({
    type: 'string',
  })
  preview: string | null;

  @ApiModelProperty({
    type: 'string',
  })
  limit: number | null;

  @ApiModelProperty()
  createdAt: Date;

  @ApiModelProperty()
  subCategories: SubCategoryResponseDto[];
}

export class SubCategoryResponseDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  name: string;

  @ApiModelProperty({
    type: 'string',
  })
  preview: string | null;

  @ApiModelProperty({
    type: 'string',
  })
  limit: number | null;

  @ApiModelProperty()
  createdAt: Date;
}

export class CategoryResponsePaginationDto {
  @ApiModelProperty({
    isArray: true,
    type: CategoryResponseDto,
  })
  items: CategoryResponseDto[];

  @ApiModelProperty()
  count: number;
}
