import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthSvcService {
  getHello(): string {
    return 'Hello World!';
  }
}
