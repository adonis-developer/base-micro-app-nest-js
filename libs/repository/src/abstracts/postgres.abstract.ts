import { DeepPartial, Repository } from 'typeorm';
import { IRepository } from '../interfaces/common.interface';

export abstract class PostgresRepository<T> implements IRepository<T> {
  protected entity: Repository<T>;
  constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  async find(): Promise<T[]> {
    return await this.entity.find();
  }

  async create(payload: T[]): Promise<T[]> {
    return await this.entity.create(payload);
  }

  async save(payload: T): Promise<T> {
    return await this.entity.save(payload);
  }

  async update(payload: DeepPartial<T> & Partial<T>): Promise<T> {
    return await this.entity.save(payload);
  }

  async bulkUpdate(payload: T[]): Promise<T[]> {
    return await this.entity.save(payload);
  }

  async bulkCreate(payload: T[]): Promise<T[]> {
    return await this.entity.save(payload);
  }
}
