import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface UserModel {
  id: string;
  name: string;
}

@Entity('users')
export class UserEntity implements UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
