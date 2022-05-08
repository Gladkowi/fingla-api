import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiModelProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiModelProperty()
  @IsNumber()
  @IsOptional()
  account: number;

  photo: string | null;
}
