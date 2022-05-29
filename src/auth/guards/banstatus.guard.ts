import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class BanStatusGuard implements CanActivate {
  constructor() { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    // TODO blocking leads to crash
    const user = request.user;

    if (user.bannedAt === null) {
      return true;
    }

    response.status(403).send({ reason: 'Ban' });
    return false;
  }
}
