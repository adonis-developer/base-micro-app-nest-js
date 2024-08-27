import { IRepository } from '@app/repository';

export interface IUserRepository<UserModel> extends IRepository<UserModel> {
  findUser(): any;
}
