import {
  ConnectedSocket, MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessageService } from './message.service';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';
import { Observable } from 'rxjs';
import { CreateMessageDto } from './dtos/create-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  connectedUsers: number[] = [];

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private userService: UserService,
  ) {
  }

  async handleConnection(
    @ConnectedSocket() client: Socket
  ) {
    const bearerJwt = client.handshake.auth.token;
    const user = await this.authService.verifyJwt(bearerJwt).catch(error => {
      client.disconnect();
    });
    if (!user) {
      return
    }
    this.connectedUsers = [...this.connectedUsers, user.userid];
    this.server.emit('users', this.connectedUsers);
  }

  async handleDisconnect(
    @ConnectedSocket() client: Socket
  ) {
    const bearerJwt = client.handshake.auth.token;
    const user = await this.authService.verifyJwt(bearerJwt).catch(error => {
      client.disconnect();
    });
    if (!user) {
      return
    }
    const userPos = this.connectedUsers.indexOf(user.userid);
    if (userPos > -1) {
      this.connectedUsers = [
        ...this.connectedUsers.slice(0, userPos),
        ...this.connectedUsers.slice(userPos + 1),
      ];
    }
    this.server.emit('users', this.connectedUsers);
  }

  @SubscribeMessage('message:get')
  async getMessages(
    @ConnectedSocket() client: Socket,
  ) {
    const result = await this.messageService.getMessages();
    this.server.emit('message', result);
  }

  @SubscribeMessage('message')
  async onMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    const event: string = 'message';
    const result = data[0];

    console.log(result);
    // await this.messageService.createMessage(result.message, 7);
    // client.broadcast.to(result.room).emit(event, result.message);
    //
    // const result = await this.messageService.createMessage(payload);
    //  this.server.in('78').emit('msgToClient', result);

    return Observable.create(observer =>
      observer.next({ event, data: result.message }),
    );
  }

  @SubscribeMessage('message:create')
  async createMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: CreateMessageDto,
  ) {
    const user = await this.authService.verifyJwt(client.handshake.auth.token).catch(error => {
      client.disconnect();
    });
    if (!user) {
      return
    }
    const result = await this.messageService.createMessage({
      text: payload.text,
      author: user.userid,
      roomId: payload.roomId
    });
    this.server.emit('message', result);
  }

  @SubscribeMessage('message:remove')
  async deleteMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() id: number,
  ) {
    await this.messageService.deleteMessage(id).then(() => {
      this.server.emit('remove', id);
    });;
  }

  @SubscribeMessage('join')
  async onRoomJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    client.join(data[0]);

    const messages = await this.messageService.getMessages();

    // Send last messages to the connected user
    client.emit('message', messages);
  }

  @SubscribeMessage('leave')
  onRoomLeave(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    client.leave(data[0]);
  }
}

