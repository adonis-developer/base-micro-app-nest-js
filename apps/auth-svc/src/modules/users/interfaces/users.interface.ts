import { IRepository } from '@app/repository';

export interface IUserRepository<UserModel> extends IRepository<UserModel> {
  findUserById(id: string): Promise<UserModel>;
}

export interface IUserModel {
  id: string;
  name: string;
}
