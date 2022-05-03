import {
  Body,
  Controller,
  Delete,
  Get,
  Param, ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Chats')
@Controller()
export class ChatController {
  constructor(
    private chatService: ChatService,
  ) {
  }

  @Get('chats')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getFilteredListChats() {

  }

  @Post('chat')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  createChat() {

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

  @Post('chat/:chatId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  addUserInChat(
    @Param('chatId', ParseIntPipe) id: number,
  ) {

  }

  @Post('chat/:chatId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  leaveFromChat(
    @Param('chatId', ParseIntPipe) id: number,
  ) {

  }

  @Post('chat/:chatId/users')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getUsersForChat(
    @Body('userIds', ParseArrayPipe) userIds: number[],
  ) {
    return this.chatService.getUserForChat(userIds);
  }
}
