import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNumber, IsString } from 'class-validator';

export class CreateAssetDto {
  @ApiModelProperty()
  @IsString()
  ticker: string;

  @ApiModelProperty()
  @IsNumber()
  count: number;

  @ApiModelProperty()
  @IsNumber()
  cost: number;

  userId: number;
}
