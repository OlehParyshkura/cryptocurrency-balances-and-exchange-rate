export abstract class IGenericRepository<T> {
  abstract getAll(): Promise<T[]>;

  abstract getById(id: number): Promise<T | null>;

  abstract getOneByFilter(filter: Partial<T>): Promise<T | null>;

  abstract create(item: T): Promise<T>;

  abstract update(id: number, item: Partial<T>): Promise<T>;
}
