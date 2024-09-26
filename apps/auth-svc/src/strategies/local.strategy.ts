import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthSvcService } from '../auth-svc.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authSvcService: AuthSvcService) {
    super({
      usernameField: 'email',
    });
    this.authSvcService = authSvcService;
  }

  async validate(email, password) {
    const user = await this.authSvcService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
