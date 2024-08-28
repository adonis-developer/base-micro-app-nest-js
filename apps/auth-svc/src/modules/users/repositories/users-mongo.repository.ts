import { Injectable } from '@nestjs/common';

import { MongoDBRepository } from '@app/repository';

import { IUserModel, IUserRepository } from '../interfaces/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

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

  async findUserById(id: string): Promise<IUserModel> {
    return await this.model.findOne({
      id,
    });
  }
}

export default UserMongoRepository;
