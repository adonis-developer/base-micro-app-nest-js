import { Inject, Injectable } from '@nestjs/common';
import { IUserModel, IUserRepository } from './interfaces/users.interface';
import { ServiceAbstract } from '@app/services/abstracts/common.service.abstract';

@Injectable()
export class UsersService extends ServiceAbstract<IUserModel> {
  constructor(
    @Inject('IUserRepository')
    private readonly useRepo: IUserRepository<IUserModel>,
  ) {
    super(useRepo);
  }

  async findOne(id: string) {
    return await this.useRepo.findUserById(id);
  }

  async saveUser(user: IUserModel) {
    return {
      user: await this.useRepo.save(user),
    };
  }
}
