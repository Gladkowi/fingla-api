import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateGoalDto {
  @ApiModelProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiModelProperty()
  @IsNumber()
  @IsOptional()
  goalTotal: number;

  @ApiModelProperty()
  @IsNumber()
  @IsOptional()
  currentTotal: number;

  @ApiModelProperty()
  @IsDateString()
  @IsOptional()
  deadline: Date;
}
