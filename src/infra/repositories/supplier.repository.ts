import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { LoggerService } from "../logger/logger.service";
import { ISupplierRepository } from "../../domain/repositories/supplier.repository.interface";
import { BaseRepository } from "./base.repository";
import { Supplier } from "../../domain/entities/supplier.entity";
import { ExceptionService } from '../exceptions/exception.service';

@Injectable()
export class SupplierRepository
  extends BaseRepository<Supplier>
  implements ISupplierRepository
{
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly logger: LoggerService,
    protected readonly exceptionService: ExceptionService,
  ) {
    super(prisma, "Supplier", logger, exceptionService);
  }
}
