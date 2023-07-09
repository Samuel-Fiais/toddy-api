export interface IBaseRepository<T> {
	create(entity: T): Promise<boolean>
	update(entity: T): Promise<boolean>
	delete(id: string): Promise<boolean>
	findAll(): Promise<T[]>
	findById(id: string): Promise<T>
	find(filter: (item: T) => boolean): Promise<T[]>
}