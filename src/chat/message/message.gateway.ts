import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dtos/create-message.dto';
import { ChatService } from '../chat.service';
import { ParseIntPipe } from '@nestjs/common';
import { CustomSocket } from '../../adapter/auth.adapter';
import { PaginationDto } from '../../core/dtos/pagination.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
export class MessageGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  connectedUsers: { roomId: number, phone: string[] }[] = [];

  constructor(
    private chatService: ChatService,
    private messageService: MessageService
  ) {
  }

  async handleDisconnect(
    @ConnectedSocket() client: CustomSocket,
  ) {
    client.emit('rooms', {
      user: client.user.phone,
      event: 'left',
    });
  }

  @SubscribeMessage('join')
  async enterChatRoom(client: CustomSocket, roomId: string) {
    const result = await this.chatService.checkAccess(client.user.userid, +roomId);
    if(!result) client.disconnect();
    client.join(roomId);
    client.to(roomId).emit('rooms', {
      user: client.user.phone,
      event: 'joined',
    });
    let trueOrFalse = false;
    const users = this.connectedUsers;
    this.connectedUsers.find((item, key) => {
      if (item.roomId == +roomId) {
        trueOrFalse = true;
        users[key].phone.push(client.user.phone);
        this.connectedUsers = [...users];
        this.server.to(roomId).emit('users', users[key].phone);
      }
    });
    if(!trueOrFalse){
      users.push({ roomId: +roomId, phone: [client.user.phone] });
      this.connectedUsers = [...users];
      this.server.to(roomId).emit('users',[client.user.phone]);
    }
    const room = await this.chatService.getChat(+roomId);
    this.server.to(roomId).emit('room', room);
  }

  @SubscribeMessage('leave')
  async leaveChatRoom(client: CustomSocket, roomId: string) {
    client.broadcast.to(roomId).emit('rooms', {
      user: client.user.phone,
      event: 'left',
    });
    client.leave(roomId);
    let users = this.connectedUsers;
    this.connectedUsers.find((item, key) => {
      if (item.roomId == +roomId) {
        users[key].phone = users[key].phone.filter((item) => item !== client.user.phone);
        this.connectedUsers = [...users];
        this.server.to(roomId).emit('users', users[key].phone);
      }
    });
  }

  @SubscribeMessage('messages:get')
  async getMessages(
    @ConnectedSocket() client: CustomSocket,
    @MessageBody('id', ParseIntPipe) id: number,
    @MessageBody() paginate: PaginationDto,
  ) {
    const [items, count] = await this.messageService.getMessages(id, paginate);
    client.emit('messages', {
      items,
      count,
    });
  }

  @SubscribeMessage('message:create')
  async createMessage(
    client: CustomSocket,
    payload: CreateMessageDto,
  ) {
    const result = await this.messageService.createMessage({
      text: payload.text,
      author: client.user.userid,
      chatId: payload.chatId,
    });
    this.server.to(payload.chatId.toString()).emit('message:one', result);
  }

  @SubscribeMessage('message:remove')
  async deleteMessage(
    @ConnectedSocket() client: CustomSocket,
    @MessageBody('id', ParseIntPipe) id: number,
    @MessageBody('chatId', ParseIntPipe) chatId: number,
  ) {
    await this.messageService.deleteMessage(id, client.user.userid).then(() => {
      this.server.to(chatId.toString()).emit('remove', id);
    });
  }

  @SubscribeMessage('chats:get')
  async getChats(
    @ConnectedSocket() client: CustomSocket,
    @MessageBody() paginate: PaginationDto,
  ) {
    const result = await this.chatService.getChats(client.user.userid, paginate);
    client.emit('chats', result.items);
  }
}

