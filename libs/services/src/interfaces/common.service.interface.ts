export interface Write<T> {
  create(payload: T[]): Promise<T[]>;
  save(payload: T): Promise<T>;
  update(payload: Partial<T>, filter?: any): Promise<T>;
  bulkUpdate(payload: T[]): Promise<T[]>;
  bulkCreate(payload: T[]): Promise<T[]>;
  softDelete(id: string): Promise<boolean>;
  permanentlyDelete(id: string): Promise<boolean>;
}

export interface Read<T> {
  findById(id: string): Promise<T>;
  find(): Promise<T[]>;
}

export interface IService<T> extends Write<T>, Read<T> {}
