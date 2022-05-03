import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiModelProperty()
  @IsString()
  text: string;

  @ApiModelProperty()
  @IsNumber()
  roomId: number;

  @ApiModelProperty()
  @IsNumber()
  @IsOptional()
  author: number;
}
