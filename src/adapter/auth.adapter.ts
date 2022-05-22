import { IoAdapter } from '@nestjs/platform-socket.io';
import { verify } from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { Role } from '../user/role.enum';

export interface CustomSocket extends Socket {
  user: {
    userid: number;
    role: Role,
    phone: string
  };
}

export class AuthAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    server.use((socket: CustomSocket, next) => {
      if (socket.handshake.auth && socket.handshake.auth.token) {
        verify(socket.handshake.auth.token, "secretKey", (err, decoded) => {
          if (err) {
            next(new Error('Authentication error'));
          } else {
            socket.user = decoded;
            next();
          }
        });
      } else {
        next(new Error('Authentication error'));
      }
    });
    return server;
  }
}

