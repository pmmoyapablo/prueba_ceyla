export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  create(entity: T): Promise<T>;
  update(id: number, entity: Partial<T>): Promise<boolean>;
  delete(id: number): Promise<boolean>;
} 