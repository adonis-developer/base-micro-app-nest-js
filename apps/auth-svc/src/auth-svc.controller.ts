import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthSvcService } from './auth-svc.service';

import { RefreshGuard } from './guards/refresh.guards';
import { JwtAuthGuard } from '@app/commons/guards/jwt.guards';
import { LocalAuthGuard } from '@app/commons/guards/local.guards';
import { Public } from '@app/commons/decorators/public-route';

@Controller('')
export class AuthSvcController {
  constructor(private readonly authSvcService: AuthSvcService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getHello(): any {
    return this.authSvcService.find();
  }

  @Get('/cipher')
  userAll(): any {
    return this.authSvcService.find();
  }

  @Post()
  @Public()
  @UseGuards(LocalAuthGuard)
  login(@Request() req) {
    return this.authSvcService.doLogin(req.user);
  }

  @Post('refresh')
  @UseGuards(RefreshGuard)
  refresh(@Request() req: any) {
    return this.authSvcService.doRefreshToken(
      req.headers['authorization'],
      req.headers['x-refresh'],
    );
  }
}
