import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsString } from 'class-validator';

export class LinkConfirmMailDto {
  @ApiModelProperty()
  @IsString()
  email: string;
}

export class SetNewPasswordDto {
  @ApiModelProperty()
  @IsString()
  password: string;
}
