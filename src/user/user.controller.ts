import {
  Body,
  Controller, Delete, Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiTags
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LinkConfirmMailDto, SetNewPasswordDto } from './dtos/link.dto';
import { User } from './decorators/user.decorator';
import { ParamsDto } from './dtos/params.dto';


@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('/password/reset')
  generateLinkForResetPassword(
    @Body() data: LinkConfirmMailDto
  ) {
    return this.userService.getLinkForChangePassword(data.email);
  }

  @Post('/email/change')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  generateLinkForChangeEmail(
    @User('id') id: number,
    @Body() data: LinkConfirmMailDto
  ) {
    return this.userService.getLinkForChangeEmail(id, data.email);
  }

  @Post('/email/resend/confirm')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  generateLinkForConfirmEmail(
    @Body() data: LinkConfirmMailDto
  ) {
    return this.userService.getLinkForConfirmEmail(data.email);
  }

  @Patch('/resetPassword/:code')
  resetPasswordByCode(
    @Param() params: ParamsDto,
    @Body() data: SetNewPasswordDto
  ) {
    return this.userService.confirmChangePassword(data, params.code);
  }

  @Patch('/changeEmail/:code')
  changeEmailByCode(
    @Param() params: ParamsDto
  ) {
    return this.userService.confirmChangeEmail(params.code);
  }

  @Patch('/confirmEmail/:code')
  async confirmEmailByCode(
    @Param() params: ParamsDto
  ) {
    return this.userService.confirmEmail(params.code);
  }

  @Patch('/profile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  updateUser() {

  }

  @Delete('')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  deleteUser() {

  }

  @Post('/password/change')
  changePasswordForUser(
    @Body() data: SetNewPasswordDto
  ) {

  }

  @Get('/home')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getHomePages(
    @User('id') userId: number,
  ) {
      return this.userService.getHomePage(userId);
  }
}
