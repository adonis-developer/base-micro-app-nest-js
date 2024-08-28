import { Inject, Injectable } from '@nestjs/common';
import { IUserModel, IUserRepository } from './interfaces/users.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUserRepository')
    private readonly useRepo: IUserRepository<IUserModel>,
  ) {}

  async findOne(id: string) {
    return {
      user: await this.useRepo.findUserById(id),
    };
  }

  async save(user: IUserModel) {
    return {
      user: await this.useRepo.save(user),
    };
  }
}
