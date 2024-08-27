import { PostgresRepository } from '@app/repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IUserRepository } from '../interfaces/users.interface';
import { UserEntity, UserModel } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
class UserRepository
  extends PostgresRepository<UserModel>
  implements IUserRepository<UserModel>
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly useRepository: Repository<UserEntity>,
  ) {
    super(useRepository);
  }

  async findUser() {
    return this.find();
  }
}

export default UserRepository;
