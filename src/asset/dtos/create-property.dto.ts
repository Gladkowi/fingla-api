import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNumber } from 'class-validator';

export class CreatePropertyDto {
  @ApiModelProperty()
  @IsNumber()
  cost: number;

  preview: string;

  userId: number;
}
