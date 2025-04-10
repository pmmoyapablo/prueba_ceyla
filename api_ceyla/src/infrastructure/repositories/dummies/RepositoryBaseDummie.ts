import { IRepository } from '../../../domain/repositories/IRepository';

export abstract class RepositoryBaseDummie<T> implements IRepository<T> {
  
  constructor() {
  }

  async findAll(): Promise<T[]> {
    const array: T[] = [];
    return array;
  }

  async findById(id: number): Promise<T | null> {
    return null;
  }

  async create(entity: T): Promise<T> {
    const object: T = {} as T;
    return object;
  }

  async update(id: number, entity: Partial<T>): Promise<boolean> {
    return true;
  }

  async delete(id: number): Promise<boolean> {
    return true;
  }
}
