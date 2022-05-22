import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessageService } from './message.service';
import { AuthService } from '../../auth/auth.service';
import { CreateMessageDto } from './dtos/create-message.dto';
import { ChatService } from '../chat.service';
import { HelperService } from '../../services/helper/helper.service';
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

  connectedUsers: number[] = [];

  constructor(
    private chatService: ChatService,
    private messageService: MessageService,
    private authService: AuthService,
    private helperService: HelperService
  ) {
  }

  async handleConnection(
    @ConnectedSocket() client: CustomSocket
  ) {
    // const bearerJwt = client.handshake.auth.token;
    // const user = await this.authService.verifyJwt(bearerJwt).catch(error => {
    //   client.disconnect();
    // });
    // if (!user) {
    //   return
    // }
    // this.connectedUsers = [...this.connectedUsers, user.userid];
    // this.server.emit('users', this.connectedUsers);


  }

  async handleDisconnect(
    @ConnectedSocket() client: CustomSocket
  ) {
    // const bearerJwt = client.handshake.auth.token;
    // const user = await this.authService.verifyJwt(bearerJwt).catch(error => {
    //   client.disconnect();
    // });
    // if (!user) {
    //   return
    // }
    // const userPos = this.connectedUsers.indexOf(user.userid);
    // if (userPos > -1) {
    //   this.connectedUsers = [
    //     ...this.connectedUsers.slice(0, userPos),
    //     ...this.connectedUsers.slice(userPos + 1),
    //   ];
    // }
    // this.server.emit('users', this.connectedUsers);
    client.emit('rooms', {
      user: client.user.phone,
      event: 'left'
    });
  }

  @SubscribeMessage('join')
  async enterChatRoom(client: CustomSocket, roomId: string) {
    client.join(roomId)
    client.to(roomId).emit('rooms', {
      user: client.user.phone,
      event: 'joined'
    });
  }

  @SubscribeMessage('leave')
  async leaveChatRoom(client: CustomSocket, roomId: string) {
    client.broadcast.to(roomId).emit('rooms', {
      user: client.user.phone,
      event: 'left'
    });
    client.leave(roomId);
  }

  @SubscribeMessage('messages:get')
  async getMessages(
    @ConnectedSocket() client: CustomSocket,
    @MessageBody('id', ParseIntPipe) id: number,
    @MessageBody() paginate: PaginationDto,
  ) {
    const [items, count] = await this.messageService.getMessages(id, paginate);
    this.server.to(id.toString()).emit('messages', {
      items: items,
      count
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
      chatId: payload.chatId
    });
    this.server.to(payload.chatId.toString()).emit('message:one', result);
  }

  @SubscribeMessage('message:remove')
  async deleteMessage(
    @ConnectedSocket() client: CustomSocket,
    @MessageBody('id', ParseIntPipe) id: number,
    @MessageBody('chatId', ParseIntPipe) chatId: number,
  ) {
    await this.messageService.deleteMessage(id).then(() => {
      this.server.to(chatId.toString()).emit('remove', id);
    });
  }


  @SubscribeMessage('chats:get')
  async getChats(
    @ConnectedSocket() client: CustomSocket,
    @MessageBody() data: any
  ) {
    const result = await this.chatService.getChats(5);
    this.server.emit('chats', result.items);
  }
}

