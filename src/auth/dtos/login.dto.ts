import { IsNotEmpty, Matches } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { isPhoneRegex } from '../validation/phone.regex';
import { isPasswordRegex } from '../validation/password.regex';

export class LoginDto {
  @ApiModelProperty()
  @Matches(isPhoneRegex)
  @IsNotEmpty()
  phone: string;

  @ApiModelProperty()
  @Matches(isPasswordRegex)
  @IsNotEmpty()
  password: string;
}
