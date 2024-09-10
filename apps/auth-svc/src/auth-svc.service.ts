import { ServiceAbstract } from '@app/services/abstracts/common.service.abstract';
import { Inject, Injectable } from '@nestjs/common';
import {
  IUserModel,
  IUserRepository,
} from './modules/users/interfaces/users.interface';
import { JwtService } from '@nestjs/jwt';
import { _compare } from '@app/commons/hash';

@Injectable()
export class AuthSvcService extends ServiceAbstract<IUserModel> {
  constructor(
    @Inject('IUserRepository')
    private readonly useRepo: IUserRepository<IUserModel>,
    private readonly jwtService: JwtService,
  ) {
    super(useRepo);
  }

  async getHello(): Promise<any> {
    return await this.find();
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
    };
  }
}
