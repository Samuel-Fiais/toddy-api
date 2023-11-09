import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { LoggerService } from "../logger/logger.service";
import { IStoreRepository } from "../../domain/repositories/store.repository.interface";
import { BaseRepository } from "./base.repository";
import { Store } from "../../domain/entities/store.entity";
import { ExceptionService } from '../exceptions/exception.service';

@Injectable()
export class StoreRepository
  extends BaseRepository<Store>
  implements IStoreRepository
{
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly logger: LoggerService,
    protected readonly exceptionService: ExceptionService,
  ) {
    super(prisma, "Store", logger, exceptionService);
  }
}
