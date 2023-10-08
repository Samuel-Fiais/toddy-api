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
      new ExceptionService().applicationOperationCreateRepository(
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
      new ExceptionService().applicationOperationUpdateRepository(
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
      new ExceptionService().applicationOperationDeleteRepository(
        this._modelName,
      );
    }
  }

  async findAll(): Promise<T[]> {
    try {
      return await this._prisma[this._modelName].findMany();
    } catch (e) {
      this._logger.error(
        `BaseRepository<${this._modelName}> findAll`,
        `Error to find all ${this._modelName}`,
        e,
      );
      new ExceptionService().applicationOperationFindRepository(
        this._modelName,
      );
    }
  }

  async findById(id: string, includeRelations?: string[]): Promise<T> {
    try {
      const query = {
        where: { id },
      };

      if (includeRelations && includeRelations.length > 0) {
        query["include"] = {};
        includeRelations.forEach((relation) => {
          query["include"][relation] = true;
        });
      }

      return await this._prisma[this._modelName].findUnique(query);
    } catch (e) {
      this._logger.error(
        `BaseRepository<${this._modelName}> findById`,
        `Error to find a ${this._modelName} by id`,
        e,
      );
      new ExceptionService().applicationOperationFindRepository(
        this._modelName,
      );
    }
  }

  async find(filter: (item: T) => boolean): Promise<T[]> {
    const entities = await this._prisma[this._modelName].findMany();

    return entities.filter(filter);
  }
}
