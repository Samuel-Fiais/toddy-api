import { Module } from "@nestjs/common";
import { SupplierRepository } from "./supplier.repository";
import { PrismaService } from "../database/prisma.service";
import { LoggerService } from "../logger/logger.service";
import { UserRepository } from "./user.repository";
import { StoreRepository } from './store.repository';
import { ExceptionService } from '../exceptions/exception.service';

@Module({
  imports: [],
  providers: [SupplierRepository, UserRepository, StoreRepository, PrismaService, LoggerService, ExceptionService],
  exports: [SupplierRepository, UserRepository, StoreRepository],
})
export class RepositoriesModule {}
