import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from './interfaces/users.interface';
import { UserModel } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUserRepository')
    private readonly useRepo: IUserRepository<UserModel>,
  ) {}

  findOne(id: number) {
    return this.useRepo.findUser();
  }
}
