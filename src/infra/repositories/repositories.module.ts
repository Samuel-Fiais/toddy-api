import { Module } from "@nestjs/common"
import { SupplierRepository } from "./supplier.repository"
import { PrismaService } from "../database/prisma.service"
import { LoggerService } from "../logger/logger.service"

@Module({
	imports: [],
	providers: [SupplierRepository, PrismaService, LoggerService],
	exports: [SupplierRepository]
})
export class RepositoriesModule {}