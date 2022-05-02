import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MessageService } from './message.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Message in Chat')
@Controller('chat/:chatId')
export class MessageController {
  constructor(
    private messageService: MessageService,
  ) { }

  @Post('message')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  sendMessage(
    @Param('chatId', ParseIntPipe) id: number
  ) {

  }

  @Put('message/:messageId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  updateMessage(
    @Param('chatId', ParseIntPipe) chatId: number,
    @Param('messageId', ParseIntPipe) messageId: number
  ) {

  }

  @Delete('message/:messageId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  deleteMessage(
    @Param('chatId', ParseIntPipe) chatId: number,
    @Param('messageId', ParseIntPipe) messageId: number
  ) {

  }
}
