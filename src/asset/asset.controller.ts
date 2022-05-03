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

@ApiTags('Assets')
@Controller()
export class AssetController {
  constructor(

  ) { }

  @Post('asset')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  createAsset() {

  }

  @Get('assets')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getListAssets() {

  }

  @Get('asset/:assetId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getAsset(
    @Param('assetId', ParseIntPipe) id: number,
  ) {

  }

  @Patch('asset/:assetId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  updateAsset(
    @Param('assetId', ParseIntPipe) id: number,
  ) {

  }

  @Delete('asset/:assetId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  deleteAsset(
    @Param('assetId', ParseIntPipe) id: number,
  ) {

  }
}
