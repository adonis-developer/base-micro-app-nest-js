import { PostgresRepository } from '@app/repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IUserModel, IUserRepository } from '../interfaces/users.interface';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
class UserRepository
  extends PostgresRepository<IUserModel>
  implements IUserRepository<IUserModel>
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly useRepository: Repository<UserEntity>,
  ) {
    super(useRepository);
  }

  async findUserById(id: string) {
    return this.useRepository.findOne({
      where: {
        id,
      },
    });
  }
}

export default UserRepository;
