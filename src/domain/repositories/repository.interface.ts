export interface IBaseRepository<T> {
  create(entity: T): Promise<T>;
  update(entity: T): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  findAll(include?: any): Promise<T[]>;
  findById(id: string, include?: any): Promise<T>;
  find(filter: (item: T) => boolean, include?: any): Promise<T[]>;
}
