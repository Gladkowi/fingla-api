import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSpendDto {
  @ApiModelProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiModelProperty()
  @IsBoolean()
  @IsOptional()
  isMonthly: boolean;

  @ApiModelProperty()
  @IsDateString()
  @IsOptional()
  date: Date;

  @ApiModelProperty()
  @IsNumber()
  @IsOptional()
  cost: number;
}
