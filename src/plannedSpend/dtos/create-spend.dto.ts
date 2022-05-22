import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSpendDto {
  @ApiModelProperty()
  @IsString()
  name: string;

  @ApiModelProperty({
    default: false
  })
  @IsBoolean()
  @IsOptional()
  isMonthly: boolean;

  @ApiModelProperty()
  @IsDateString()
  date: Date;

  @ApiModelProperty()
  @IsNumber()
  cost: number;

  userId: number;
}
