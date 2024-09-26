import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthSvcService } from './auth-svc.service';

import { RefreshGuard } from './guards/refresh.guards';
import { LocalAuthGuard } from '@app/commons/guards/local.guards';
import { Public } from '@app/commons/decorators/public-route';
import { ForgotPassDTO } from './auth-svc.dto';

@Controller('')
export class AuthSvcController {
  constructor(private readonly authSvcService: AuthSvcService) {}

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

  @Post('/forgot-password')
  @Public()
  forgotPass(@Body() forgotPassDTO: ForgotPassDTO) {
    return this.authSvcService.doForgotPass(forgotPassDTO.email);
  }
}
