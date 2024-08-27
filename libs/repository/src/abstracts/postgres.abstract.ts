import { Repository } from 'typeorm';
import { IRepository } from '../interfaces/common.interface';

export abstract class PostgresRepository<T> implements IRepository<T> {
  private entity: Repository<T>;
  constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  async find(): Promise<T[]> {
    return await this.entity.find();
  }

  async create(payload: T): Promise<T> {
    throw new Error('Method not implemented.');
  }
  async save(payload: T): Promise<T> {
    throw new Error('Method not implemented.');
  }
  async update(payload: Partial<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
  async bulkUpdate(payload: T[]): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  async bulkCreate(payload: T[]): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
}
