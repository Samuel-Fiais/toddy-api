import { Injectable, LoggerService } from "@nestjs/common";
import { IBaseRepository } from "src/domain/repositories/repository.interface";
import { PrismaService } from "../database/prisma.service";
import { ExceptionService } from "../exceptions/exception.service";

@Injectable()
export class BaseRepository<T> implements IBaseRepository<T> {
	constructor(
		protected readonly _prisma: PrismaService,
		private readonly _modelName: string,
		protected logger: LoggerService
	) {}

	async create(entity: T): Promise<boolean> {
		try {
			const lastElement = await this._prisma[this._modelName].findFirst({
				orderBy: {
					alternateId: 'desc'
				}
			})
	
			if (!lastElement) entity['alternateId'] = 1
			else  entity['alternateId'] = lastElement['alternateId'] + 1
	
			const createdEntity = await this._prisma[this._modelName].create({
				data: entity
			});
		
			if (!createdEntity) return false;
		
			return true;
		} catch (e) {
			this.logger.error(`BaseRepository<${this._modelName}> create`, `Error to create a new ${this._modelName}`, e)
			new ExceptionService().applicationOperationCreateRepository(this._modelName)
		}
	}
	
	async update(entity: T): Promise<boolean> {
		const id = entity['id'];
		const updatedEntity = await this._prisma[this._modelName].update({
			where: { id },
			data: entity,
		});
	
		if (!updatedEntity) return false;
	
		return true;
	}
	
	async delete(id: string): Promise<boolean> {
		const deletedEntity = await this._prisma[this._modelName].delete({
			where: { id },
		});
	
		if (!deletedEntity) return false;
	
		return true;
	}
	
	async findAll(): Promise<T[]> {
		try {
			const entities = await this._prisma[this._modelName].findMany()

			return entities
		} catch (e) {
			this.logger.error(`BaseRepository<${this._modelName}> findAll`, `Error to find all ${this._modelName}`, e)
			new ExceptionService().applicationOperationFindRepository(this._modelName)
		}
	}
	
	async findById(id: string): Promise<T> {
		try {
			const entity = await this._prisma[this._modelName].findUnique({
				where: { id },
			});
	
			return entity;
		} catch (e) {
			this.logger.error(`BaseRepository<${this._modelName}> findById`, `Error to find a ${this._modelName} by id`, e)
			new ExceptionService().applicationOperationFindRepository(this._modelName)
		}
	}
	
	async find(filter: (item: T) => boolean): Promise<T[]> {
		const entities = await this._prisma[this._modelName].findMany();

		return entities.filter(filter);
	}
}