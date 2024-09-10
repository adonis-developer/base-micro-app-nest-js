import { PostgresRepository } from '@app/repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IUserModel, IUserRepository } from '../interfaces/users.interface';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { _hash } from '@app/commons/hash';

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

  async findUserByEmail(email: string): Promise<IUserModel> {
    return await this.useRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findUserById(id: string) {
    return await this.findById(id);
  }

  async saveUser(payload: IUserModel): Promise<IUserModel> {
    const user = await this.findUserByEmail(payload.email);
    if (user) throw new ConflictException('User is exist');
    payload.password = await _hash(payload.password, 3);
    const newUser = await this.save(payload);
    delete newUser.password;
    return newUser;
  }
}

export default UserRepository;
