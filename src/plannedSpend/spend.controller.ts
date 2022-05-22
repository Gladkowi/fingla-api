import {
  Body,
  Controller,
  Delete,
  Get, HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SpendService } from './spend.service';
import { User } from '../user/decorators/user.decorator';
import { CreateSpendDto } from './dtos/create-spend.dto';
import { PlannedSpendResponseDto, PlannedSpendResponsePaginationDto } from './dtos/responses.dto';
import { PaginationDto } from '../core/dtos/pagination.dto';
import { UpdateSpendDto } from './dtos/update-spend.dto';

@ApiTags('Planned Spend')
@Controller()
export class SpendController {
  constructor(
    private spendService: SpendService,
  ) { }

  @Post('spend')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: PlannedSpendResponseDto
  })
  @UseGuards(AuthGuard('jwt'))
  createSpend(
    @User('id') userId: number,
    @Body() body: CreateSpendDto
  ): Promise<PlannedSpendResponseDto> {
    body.userId = userId;
    return this.spendService.createPlannedSpend(body);
  }

  @Get('spends')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: PlannedSpendResponsePaginationDto
  })
  @UseGuards(AuthGuard('jwt'))
  getListSpends(
    @User('id') userId: number,
    @Query() paginate: PaginationDto
  ): Promise<PlannedSpendResponsePaginationDto> {
    return this.spendService.getListPlannedSpend(userId, paginate);
  }

  @Get('spend/:spendId')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: PlannedSpendResponseDto
  })
  @UseGuards(AuthGuard('jwt'))
  getSpend(
    @Param('spendId', ParseIntPipe) id: number
  ): Promise<PlannedSpendResponseDto> {
    return this.spendService.getPlannedSpend(id);
  }

  @Patch('spend/:spendId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  updateSpend(
    @Param('spendId', ParseIntPipe) id: number,
    @Body() body: UpdateSpendDto
  ) {
    return this.spendService.updatePlannedSpend(id, body);
  }

  @Delete('spend/:spendId')
  @ApiBearerAuth()
  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  deleteSpend(
    @Param('spendId', ParseIntPipe) id: number
  ) {
    return this.spendService.deletePlannedSpend(id);
  }
}
