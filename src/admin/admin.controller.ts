import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../user/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SearchDto } from './dtos/search.dto';
import { PaginationDto } from '../core/dtos/pagination.dto';

@ApiTags('Admin')
@Controller('admin')
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
    return this.adminService.banUser(id);
  }

  @Post('user/:userId/unban')
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  unbanUser(
    @Param('userId', ParseIntPipe) id: number
  ) {
    return this.adminService.unbanUser(id);
  }

  @Get('users')
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getUsers(
    @Query() paginate: PaginationDto
  ) {
    return this.adminService.getUsers(paginate);
  }

  @Get('users/search')
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  searchUsers(
    @Query() query: SearchDto
  ) {
    return this.adminService.searchUsers(query);
  }
}
