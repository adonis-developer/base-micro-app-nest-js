export interface IRepository<T> {
  // findById(id: string): Promise<T>;
  find(): Promise<T[]>;
  create(payload: T[]): Promise<T[]>;
  save(payload: T): Promise<T>;
  update(payload: Partial<T>, filter?: any): Promise<T>;
  bulkUpdate(payload: T[]): Promise<T[]>;
  bulkCreate(payload: T[]): Promise<T[]>;
}
