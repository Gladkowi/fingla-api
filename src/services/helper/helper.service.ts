import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Injectable()
export class HelperService {
  constructor(readonly configService:ConfigService) {}
  public getRandomInt(min = 10000000, max = 99999999): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}


