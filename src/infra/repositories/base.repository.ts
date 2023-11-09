import { Injectable, LoggerService } from "@nestjs/common";
import { IBaseRepository } from "src/domain/repositories/repository.interface";
import { PrismaService } from "../database/prisma.service";
import { ExceptionService } from "../exceptions/exception.service";

@Injectable()
export class BaseRepository<T> implements IBaseRepository<T> {
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _modelName: string,
    private readonly _logger: LoggerService,
    private readonly _exceptionService: ExceptionService,
  ) {}

  async create(entity: T): Promise<T> {
    try {
      const lastElement = await this._prisma[this._modelName].findFirst({
        orderBy: {
          alternateId: "desc",
        },
      });

      if (!lastElement) entity["alternateId"] = 1;
      else entity["alternateId"] = lastElement["alternateId"] + 1;

      return await this._prisma[this._modelName].create({
        data: entity,
      });
    } catch (e) {
      this._logger.error(
        `BaseRepository<${this._modelName}> create`,
        `Error to create a new ${this._modelName}`,
        e,
      );
      this._exceptionService.applicationOperationCreateRepository(
        this._modelName,
      );
    }
  }

  async update(entity: T): Promise<boolean> {
    try {
      const id = entity["id"];
      delete entity["createdAt"];
      return await this._prisma[this._modelName].update({
        where: { id },
        data: entity,
      });
    } catch (e) {
      this._logger.error(
        `BaseRepository<${this._modelName}> update`,
        `Error to update a ${this._modelName}`,
        e,
      );
      this._exceptionService.applicationOperationUpdateRepository(
        this._modelName,
      );
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      return await this._prisma[this._modelName].delete({
        where: { id },
      });
    } catch (e) {
      this._logger.error(
        `BaseRepository<${this._modelName}> delete`,
        `Error to delete a ${this._modelName}`,
        e,
      );
      this._exceptionService.applicationOperationDeleteRepository(
        this._modelName,
      );
    }
  }

  async findAll(include?: any): Promise<T[]> {
    try {
      return await this._prisma[this._modelName].findMany({
        include: include ?? {},
      });
    } catch (e) {
      this._logger.error(
        `BaseRepository<${this._modelName}> findAll`,
        `Error to find all ${this._modelName}`,
        e,
      );
      this._exceptionService.applicationOperationFindRepository(
        this._modelName,
      );
    }
  }

  async findById(id: string, include?: any): Promise<T> {
    try {
      return await this._prisma[this._modelName].findUnique({
        where: { id },
        include: include ?? {},
      });
    } catch (e) {
      this._logger.error(
        `BaseRepository<${this._modelName}> findById`,
        `Error to find a ${this._modelName} by id`,
        e,
      );
      this._exceptionService.applicationOperationFindRepository(
        this._modelName,
      );
    }
  }

  async find(filter: (item: T) => boolean, include?: any): Promise<T[]> {
    try {
      const entities = await this._prisma[this._modelName].findMany({
        include: include ?? {},
      });

      return entities.filter(filter);
    } catch (e) {
      this._logger.error(
        `BaseRepository<${this._modelName}> find`,
        `Error to find a ${this._modelName}`,
        e,
      );
      this._exceptionService.applicationOperationFindRepository(
        this._modelName,
      );
    }
  }
}
