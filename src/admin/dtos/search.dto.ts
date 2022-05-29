import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsOptional, IsString } from 'class-validator';

export class SearchDto {
  @ApiModelProperty()
  @IsString()
  @IsOptional()
  name: string;
}
