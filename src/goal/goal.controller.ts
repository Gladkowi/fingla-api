import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Goals')
@Controller()
export class GoalController {
  constructor(

  ) { }

  @Post('goal')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  createGoal() {

  }

  @Get('goals')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getListGoals() {

  }

  @Get('goal/:goalId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getGoal(
    @Param('goalId', ParseIntPipe) id: number
  ) {

  }

  @Patch('goal/:goalId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  updateGoal(
    @Param('goalId', ParseIntPipe) id: number
  ) {

  }

  @Delete('goal/:goalId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  deleteGoal(
    @Param('goalId', ParseIntPipe) id: number
  ) {

  }
}
