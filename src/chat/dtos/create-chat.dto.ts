import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsString } from 'class-validator';

export class CreateChatDto {
  @ApiModelProperty()
  @IsString()
  name: string;

  preview: string;
}
