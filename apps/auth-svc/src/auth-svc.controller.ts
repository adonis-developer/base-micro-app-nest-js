import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthSvcService } from './auth-svc.service';
import { LocalAuthGuard } from './guards/local.guards';
import { JwtAuthGuard } from './guards/jwt.guards';
import { RefreshGuard } from './guards/refresh.guards';
import { CipherGuard } from './guards/cipher.guards';

@Controller('')
export class AuthSvcController {
  constructor(private readonly authSvcService: AuthSvcService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getHello(): any {
    return this.authSvcService.find();
  }

  @Get('/cipher')
  @UseGuards(CipherGuard)
  userAll(): any {
    return this.authSvcService.find();
  }

  @Post()
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
