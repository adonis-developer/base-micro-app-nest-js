import { ServiceAbstract } from '@app/services/abstracts/common.service.abstract';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  IUserModel,
  IUserRepository,
} from './modules/users/interfaces/users.interface';
import { JwtService } from '@nestjs/jwt';
import { _compare } from 'libs/commons/hash';
import { env } from './configs/environment-variable';
import { EmailService } from '@app/kyc/services/email.service';
import * as handlebars from 'handlebars';
import { LocalFileHelper } from './helpers/local-file';
@Injectable()
export class AuthSvcService extends ServiceAbstract<IUserModel> {
  constructor(
    @Inject('IUserRepository')
    private readonly useRepo: IUserRepository<IUserModel>,
    private readonly emailSvc: EmailService,
    private readonly jwtService: JwtService,
  ) {
    super(useRepo);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.useRepo.findUserByEmail(email);

    if (user && _compare(password, user.password)) {
      delete user.password;
      return user;
    }
    return null;
  }

  async doLogin(user: Omit<IUserModel, 'password'>) {
    const payload = { username: user.name, sub: user.id, email: user.email };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '1d',
        secret: env.auth.secretRefresh,
      }),
    };
  }

  async doRefreshToken(accessToken: string, refreshToken: string) {
    try {
      await this.jwtService.verifyAsync(accessToken.split(' ')[1]);
      return {
        accessToken: accessToken.split(' ')[1],
        refreshToken,
      };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        try {
          const isValidRefresh = await this.jwtService.verifyAsync(
            refreshToken,
            { secret: env.auth.secretRefresh },
          );

          delete isValidRefresh.exp;
          delete isValidRefresh.iat;
          return {
            accessToken: this.jwtService.sign(isValidRefresh),
            refreshToken,
          };
        } catch {
          throw new UnauthorizedException();
        }
      } else {
        throw new UnauthorizedException();
      }
    }
  }

  async doForgotPass(email: string) {
    const user = await this.useRepo.findUserByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    const payload = { username: user.name, sub: user.id, email: user.email };
    const resetToken = this.jwtService.sign(payload, {
      expiresIn: '5m',
      secret: env.auth.resetSecret,
    });
    const sourceEmail = LocalFileHelper.read('./templates/forgot-pass.html');
    const template = handlebars.compile(sourceEmail);
    const form = template({
      email,
      name: user.name,
      resetLink: `http://localhost:9090/reset?resetToken=${resetToken}`,
    });
    this.emailSvc.send({
      to: 'nvvan.0901.developer@gmail.com',
      subject: 'Reset Password $Project',
      text: '',
      html: form,
    });
    return {
      success: true,
    };
  }
}
