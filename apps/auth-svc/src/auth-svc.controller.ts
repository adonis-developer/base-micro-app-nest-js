import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthSvcService } from './auth-svc.service';
import { LocalAuthGuard } from './guards/local.guards';
import { JwtAuthGuard } from './guards/jwt.guards';

@Controller()
export class AuthSvcController {
  constructor(private readonly authSvcService: AuthSvcService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getHello(): any {
    return this.authSvcService.getHello();
  }

  @Post()
  @UseGuards(LocalAuthGuard)
  login(@Request() req) {
    return this.authSvcService.doLogin(req.user);
  }
}
