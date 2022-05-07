import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEventDto {
  @ApiModelProperty()
  @IsString()
  @IsOptional()
  comment: string;

  @ApiModelProperty()
  @IsNumber()
  @IsOptional()
  sum: number;

  @ApiModelProperty()
  @IsDate()
  @IsOptional()
  date: Date;

  @ApiModelProperty()
  @IsString()
  @IsOptional()
  tag: string;

  @ApiModelProperty()
  @IsNumber()
  @IsOptional()
  categoryId: number;

  @ApiModelProperty()
  @IsNumber()
  @IsOptional()
  subCategoryId: number;
}
