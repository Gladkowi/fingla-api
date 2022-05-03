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

@ApiTags('Planned Spend')
@Controller()
export class SpendController {
  constructor(

  ) { }

  @Post('spend')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  createSpend() {

  }

  @Get('spends')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getListSpends() {

  }

  @Get('spend/:spendId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getSpend(
    @Param('spendId', ParseIntPipe) id: number
  ) {

  }

  @Patch('spend/:spendId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  updateSpend(
    @Param('spendId', ParseIntPipe) id: number
  ) {

  }

  @Delete('spend/:spendId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  deleteSpend(
    @Param('spendId', ParseIntPipe) id: number
  ) {

  }
}
