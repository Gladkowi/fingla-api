import { IsEmail, IsString, Matches } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { isPhoneRegex } from '../validation/phone.regex';
import { isPasswordRegex } from '../validation/password.regex';

export class CreateUserDto {
  @ApiModelProperty()
  @IsString()
  name: string;

  @ApiModelProperty()
  @IsEmail()
  email: string;

  @ApiModelProperty()
  @IsString()
  @Matches(isPhoneRegex)
  phone: string;

  @ApiModelProperty()
  @IsString()
  @Matches(isPasswordRegex)
  password: string;
}
