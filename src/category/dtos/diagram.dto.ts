import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsDateString, IsEnum } from 'class-validator';
import { CategoryTypeEnum } from '../enums/category-type.enum';

export class DiagramDto {
  @ApiModelProperty()
  @IsDateString()
  start: Date;

  @ApiModelProperty()
  @IsDateString()
  end: Date;

  @ApiModelProperty({
    type: Object.keys(CategoryTypeEnum),
    example: CategoryTypeEnum.EXPENSE
  })
  @IsEnum(CategoryTypeEnum)
  type: CategoryTypeEnum;
}
