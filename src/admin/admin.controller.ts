import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../user/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Admin')
@Controller()
export class AdminController {
  constructor(
    private adminService: AdminService
  ) { }


  @Post('user/:userId/ban')
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  banUser(
    @Param('userId', ParseIntPipe) id: number
  ) {

  }

  @Post('user/:userId/unban')
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  unbanUser(
    @Param('userId', ParseIntPipe) id: number
  ) {

  }
}
