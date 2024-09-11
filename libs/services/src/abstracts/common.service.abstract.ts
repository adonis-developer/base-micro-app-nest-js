import { IModel } from 'libs/commons';
import { IService } from '../interfaces/common.service.interface';
import { IRepository } from '@app/repository';

export abstract class ServiceAbstract<T extends IModel> implements IService<T> {
  constructor(private readonly repository: IRepository<T>) {}
  async softDelete(id: string): Promise<boolean> {
    return await this.repository.softDelete(id);
  }
  async permanentlyDelete(id: string): Promise<boolean> {
    return await this.repository.permanentlyDelete(id);
  }
  async create(payload: T[]): Promise<T[]> {
    return await this.repository.create(payload);
  }

  async save(payload: T): Promise<T> {
    return await this.repository.save(payload);
  }

  async update(payload: Partial<T>, filter?: any): Promise<T> {
    return await this.repository.update(payload, filter);
  }

  async bulkUpdate(payload: T[]): Promise<T[]> {
    return await this.repository.bulkUpdate(payload);
  }

  async bulkCreate(payload: T[]): Promise<T[]> {
    return await this.repository.bulkCreate(payload);
  }

  async findById(id: string): Promise<T> {
    return await this.repository.findById(id);
  }

  async find(): Promise<T[]> {
    return await this.repository.find();
  }

  // async remove(id: string) {
  //   return await this.repository.softDelete(id);
  // }
}
