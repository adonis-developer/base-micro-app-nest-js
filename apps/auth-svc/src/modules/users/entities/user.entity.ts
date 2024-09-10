import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUserModel } from '../interfaces/users.interface';
import { Exclude } from 'class-transformer';

@Entity('users')
export class UserEntity implements IUserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    unique: true,
  })
  email: string;

  @Column({
    type: 'character varying',
  })
  @Exclude()
  password: string;

  @Column({
    default: true,
  })
  isForcePass: boolean;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
