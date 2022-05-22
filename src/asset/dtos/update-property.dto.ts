import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdatePropertyDto {
  @ApiModelProperty()
  @IsNumber()
  @IsOptional()
  cost: number;

  preview: string;
}
