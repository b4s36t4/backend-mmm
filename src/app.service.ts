import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): unknown {
    return { version: '1.0.0' };
  }
}
