import { IModel } from '@app/commons/index';
import { IRepository } from '@app/repository';

export interface IUserRepository<UserModel> extends IRepository<UserModel> {
  findUserById(id: string): Promise<UserModel>;
  findUserByEmail(email: string): Promise<UserModel>;
  saveUser(payload: IUserModel): Promise<IUserModel>;
}

export interface IUserModel extends IModel {
  id: string;
  name: string;
  email: string;
  password: string;
  isForcePass: boolean;
}
