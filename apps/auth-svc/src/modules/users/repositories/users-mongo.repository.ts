import { ConflictException, Injectable } from '@nestjs/common';

import { MongoDBRepository } from '@app/repository';

import { IUserModel, IUserRepository } from '../interfaces/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { _hash } from 'libs/commons/hash';

@Injectable()
class UserMongoRepository
  extends MongoDBRepository<IUserModel>
  implements IUserRepository<IUserModel>
{
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {
    super(userModel);
  }

  async findUserByEmail(email: string): Promise<IUserModel> {
    return await this.model.findOne({
      email,
    });
  }

  async findUserById(id: string): Promise<IUserModel> {
    return await this.model.findOne({
      id,
    });
  }

  async saveUser(payload: IUserModel): Promise<IUserModel> {
    const user = await this.findUserByEmail(payload.email);
    if (user) throw new ConflictException('User is exist');
    payload.password = await _hash(payload.password);
    const newUser = await this.save(payload);
    delete newUser.password;
    return newUser;
  }
}

export default UserMongoRepository;
