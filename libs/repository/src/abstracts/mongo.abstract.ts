import { Model } from 'mongoose';
import { IRepository } from '../interfaces/common.interface';

export abstract class MongoDBRepository<T> implements IRepository<T> {
  protected model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }

  async find(): Promise<T[]> {
    return await this.model.find();
  }

  async create(payload: T[]): Promise<T[]> {
    return await this.model.create(payload);
  }

  async save(payload: T): Promise<T> {
    const modelData = new this.model(payload);
    return (await modelData.save(payload)) as T;
  }

  async update(payload: Partial<T>, filter: any): Promise<T> {
    return (await this.model.updateOne(filter, payload)) as T;
  }

  async bulkUpdate(payload: T[]): Promise<T[]> {
    throw new Error(
      `The method not support for ${MongoDBRepository.name} => ${JSON.stringify(payload)}`,
    );
  }

  async bulkCreate(payload: T[]): Promise<T[]> {
    const listModel = () => payload.map((item) => new this.model(item));
    return await this.model.insertMany(listModel());
  }
}
