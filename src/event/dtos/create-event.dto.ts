import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @ApiModelProperty()
  @IsString()
  @IsOptional()
  comment: string;

  @ApiModelProperty()
  @IsNumber()
  sum: number;

  @ApiModelProperty()
  @IsNumber()
  categoryId: number;

  @ApiModelProperty()
  @IsDateString()
  date: Date;

  @ApiModelProperty()
  @IsString()
  @IsOptional()
  tag: string;

  @ApiModelProperty()
  @IsNumber()
  @IsOptional()
  subCategoryId: number;
}
