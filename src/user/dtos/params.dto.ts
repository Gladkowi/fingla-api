import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsString } from 'class-validator';

export class ParamsDto {
  @ApiModelProperty()
  @IsString()
  code: string;
}
