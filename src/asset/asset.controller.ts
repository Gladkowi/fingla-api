import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe, Patch,
  Post,
  Query, UploadedFile,
  UseGuards, UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dtos/create-asset.dto';
import { User } from '../user/decorators/user.decorator';
import { PaginationDto } from '../core/dtos/pagination.dto';
import {
  AssetActionResponsePaginationDto,
  AssetResponseDto, PropertyResponseDto,
  PropertyResponsePaginationDto,
} from './dtos/responses.dto';
import { CreatePropertyDto } from './dtos/create-property.dto';
import { UpdatePropertyDto } from './dtos/update-property.dto';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveFileToStorage } from '../core/storage';

@ApiTags('Assets')
@Controller()
export class AssetController {
  constructor(
    private assetService: AssetService
  ) { }

  @Get('assets/actions')
  @ApiOkResponse({
    type: AssetActionResponsePaginationDto
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getListAssetsActions(
    @User('id') userId: number,
    @Query() paginate: PaginationDto
  ): Promise<AssetActionResponsePaginationDto> {
    return this.assetService.getListAssetsActions(userId, paginate);
  }

  @Get('assets')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getListAssets(
    @User('id') userId: number,
    @Query() paginate: PaginationDto
  ) {
    return this.assetService.getListAsset(userId, paginate);
  }

  @Get('asset/:assetId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getAsset(
    @Param('assetId', ParseIntPipe) id: number,
  ): Promise<AssetResponseDto> {
    return this.assetService.getAsset(id);
  }

  @Post('asset')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  createAsset(
    @User('id') userId: number,
    @Body() body: CreateAssetDto
  ) {
    body.userId = userId;
    return this.assetService.actionAsset(body);
  }

  @Delete('asset/:assetId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async deleteAsset(
    @Param('assetId', ParseIntPipe) id: number,
  ) {
    await this.assetService.deleteAsset(id);
  }

  @Get('properties')
  @ApiOkResponse({
    type: PropertyResponsePaginationDto
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getListProperties(
    @User('id') userId: number,
    @Query() paginate: PaginationDto
  ): Promise<PropertyResponsePaginationDto> {
    return this.assetService.getListProperties(userId, paginate);
  }

  @Get('property/:propertyId')
  @ApiOkResponse({
    type: PropertyResponseDto
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getProperty(
    @Param('propertyId', ParseIntPipe) id: number,
  ): Promise<PropertyResponseDto> {
    return this.assetService.getProperty(id);
  }

  @Post('property')
  @ApiOkResponse({
    type: PropertyResponseDto
  })
  @ApiBearerAuth()
  @ApiImplicitFile({
    name: 'preview',
    required: false,
  })
  @UseInterceptors(FileInterceptor('preview', saveFileToStorage))
  @UseGuards(AuthGuard('jwt'))
  createProperty(
    @User('id') userId: number,
    @Body() body: CreatePropertyDto,
    @UploadedFile() preview
  ): Promise<PropertyResponseDto> {
    if (preview) {
      body.preview = preview.filename;
    }
    body.userId = userId;
    return this.assetService.createProperty(body);
  }

  @Patch('property/:propertyId')
  @ApiBearerAuth()
  @ApiImplicitFile({
    name: 'preview',
    required: false,
  })
  @UseInterceptors(FileInterceptor('preview', saveFileToStorage))
  @UseGuards(AuthGuard('jwt'))
  updateProperty(
    @Param('propertyId', ParseIntPipe) id: number,
    @Body() body: UpdatePropertyDto,
    @UploadedFile() preview
  ) {
    if (preview) {
      body.preview = preview.filename;
    }
    return this.assetService.updateProperty(id, body);
  }

  @Delete('property/:propertyId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  deleteProperty(
    @Param('propertyId', ParseIntPipe) id: number,
  ) {
    return  this.assetService.deleteProperty(id);
  }
}
