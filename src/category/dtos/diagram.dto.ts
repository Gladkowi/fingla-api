import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsDateString } from 'class-validator';

export class DiagramDto {
  @ApiModelProperty()
  @IsDateString()
  start: Date;

  @ApiModelProperty()
  @IsDateString()
  end: Date;
}
