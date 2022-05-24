import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MessageService } from './message.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateMessageDto } from './dtos/create-message.dto';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../user/role.enum';

@ApiTags('Message in Chat')
@Controller('chat/:chatId')
export class MessageController {
  constructor(
    private messageService: MessageService
  ) { }

  @Post('message')
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  sendMessage(
    @Param('chatId', ParseIntPipe) id: number,
    @Body() body: CreateMessageDto
  ) {
    return this.messageService.createMessage(body)
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
