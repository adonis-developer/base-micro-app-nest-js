import { Controller, Get } from '@nestjs/common';
import { AuthSvcService } from './auth-svc.service';

@Controller()
export class AuthSvcController {
  constructor(private readonly authSvcService: AuthSvcService) {}

  @Get()
  getHello(): string {
    return this.authSvcService.getHello();
  }
}
