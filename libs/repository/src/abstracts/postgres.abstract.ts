import { DeepPartial, Repository } from 'typeorm';
import { IRepository } from '../interfaces/common.interface';

export abstract class PostgresRepository<T> implements IRepository<T> {
  protected entity: Repository<T>;
  constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  async softDelete(id: string): Promise<boolean> {
    const entity = await this.entity.findOne({ where: { id } as any });
    if (entity) {
      return !!(await this.entity.softRemove(entity));
    }
    return false;
  }

  async permanentlyDelete(id: string): Promise<boolean> {
    const entity = await this.entity.findOne({ where: { id } as any });
    if (entity) {
      return !!(await this.entity.remove(entity));
    }
    return false;
  }

  async findById(id: string): Promise<T> {
    return await this.entity.findOne({
      where: {
        id,
      } as any,
    });
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

  async update(payload: DeepPartial<T> & Partial<T>, filter: any): Promise<T> {
    await this.entity.save({ ...filter, ...payload });
    return this.entity.findOne({
      where: {
        ...filter,
      },
    });
  }

  async bulkUpdate(payload: T[]): Promise<T[]> {
    return await this.entity.save(payload);
  }

  async bulkCreate(payload: T[]): Promise<T[]> {
    return await this.entity.save(payload);
  }
}
