import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateChatDto } from './dtos/create-chat.dto';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveFileToStorage } from '../core/storage';

@ApiTags('Chats')
@Controller()
export class ChatController {
  constructor(
    private chatService: ChatService,
  ) {
  }


  @Post('chat')
  @ApiBearerAuth()
  @ApiImplicitFile({
    name: 'preview',
    required: false
  })
  @UseInterceptors(FileInterceptor('preview', saveFileToStorage))
  @UseGuards(AuthGuard('jwt'))
  createChat(
    @Body() body: CreateChatDto,
    @UploadedFile() preview
  ) {
    if (preview) {
      body.preview = preview.filename;
    }
    return this.chatService.createChat(body);
  }

  @Get('chat/:chatId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getChat(
    @Param('chatId', ParseIntPipe) id: number,
  ) {

  }

  @Patch('chat/:chatId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  updateChat(
    @Param('chatId', ParseIntPipe) id: number,
  ) {

  }

  @Delete('chat/:chatId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  hiddenChat(
    @Param('chatId', ParseIntPipe) id: number,
  ) {

  }

  @Post('chat/:chatId/new-user/:userId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  addUserInChat(
    @Param('chatId', ParseIntPipe) chatId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {

  }

  @Post('chat/:chatId/remove-user/:userId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  leaveFromChat(
    @Param('chatId', ParseIntPipe) chatId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {

  }

  @Post('chat/users/info')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getUsersForChat(
    @Body('userPhones', ParseArrayPipe) userPhones: string[],
  ) {
    return this.chatService.getUserForChat(userPhones);
  }
}
