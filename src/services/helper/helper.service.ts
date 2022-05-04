import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import path = require('path');

@Injectable()
export class HelperService {
  constructor(readonly configService:ConfigService) {}
  public getRandomInt(min = 10000000, max = 99999999): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  public getLink(pathName: string) {
    return new URL(pathName, this.configService.get('main_url')).href;
  }

  public setLink(pathName: string) {
    return path.join(this.configService.get('storage.store'), pathName);
  }
}
