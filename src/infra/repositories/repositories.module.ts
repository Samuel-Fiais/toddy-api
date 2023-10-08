import { Module } from "@nestjs/common";
import { SupplierRepository } from "./supplier.repository";
import { PrismaService } from "../database/prisma.service";
import { LoggerService } from "../logger/logger.service";
import { UserRepository } from "./user.repository";

@Module({
  imports: [],
  providers: [SupplierRepository, UserRepository, PrismaService, LoggerService],
  exports: [SupplierRepository, UserRepository],
})
export class RepositoriesModule {}
