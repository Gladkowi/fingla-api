import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsString, Matches } from 'class-validator';
import { isPasswordRegex } from '../../auth/validation/password.regex';

export class LinkConfirmMailDto {
  @ApiModelProperty()
  @IsString()
  email: string;
}

export class SetNewPasswordDto {
  @ApiModelProperty()
  @IsString()
  @Matches(isPasswordRegex)
  password: string;
}
