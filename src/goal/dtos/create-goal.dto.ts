import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateGoalDto {
  @ApiModelProperty()
  @IsString()
  name: string;

  @ApiModelProperty()
  @IsNumber()
  goalTotal: number;

  @ApiModelProperty()
  @IsDateString()
  deadline: Date;

  userId: number;
}
