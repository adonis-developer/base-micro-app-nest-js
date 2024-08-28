import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUserModel } from '../interfaces/users.interface';

@Entity('users')
export class UserEntity implements IUserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
