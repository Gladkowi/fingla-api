import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GoalService } from './goal.service';
import { User } from '../user/decorators/user.decorator';
import { PaginationDto } from '../core/dtos/pagination.dto';
import { GoalResponseDto, GoalResponsePaginationDto } from './dtos/responses.dto';
import { CreateGoalDto } from './dtos/create-goal.dto';
import { UpdateGoalDto } from './dtos/update-goal.dto';

@ApiTags('Goals')
@Controller()
export class GoalController {
  constructor(
      private goalService: GoalService
  ) { }

  @Post('goal')
  @ApiOkResponse({
    type: GoalResponseDto
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  createGoal(
    @User('id') userId: number,
    @Body() body: CreateGoalDto
  ): Promise<GoalResponseDto> {
    body.userId = userId;
    return this.goalService.createGoal(body);
  }

  @Get('goals')
  @ApiOkResponse({
    type: GoalResponsePaginationDto
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getListGoals(
    @User('id') userId: number,
    @Query() paginate: PaginationDto
  ): Promise<GoalResponsePaginationDto> {
    return this.goalService.getListGoal(userId, paginate);
  }

  @Get('goal/:goalId')
  @ApiOkResponse({
    type: GoalResponseDto
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getGoal(
    @Param('goalId', ParseIntPipe) id: number
  ): Promise<GoalResponseDto> {
    return this.goalService.getGoal(id);
  }

  @Patch('goal/:goalId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  updateGoal(
    @Param('goalId', ParseIntPipe) id: number,
    @Body() body: UpdateGoalDto
  ) {
    return this.goalService.updateGoal(id, body);
  }

  @Delete('goal/:goalId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  deleteGoal(
    @Param('goalId', ParseIntPipe) id: number
  ) {
    return this.goalService.deleteGoal(id);
  }
}
