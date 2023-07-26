import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { Supplier } from "src/domain/entities/supplier.entity";
import { PrismaService } from "../database/prisma.service";
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class SupplierRepository extends BaseRepository<Supplier> {
	constructor(protected readonly _prisma: PrismaService, protected logger: LoggerService) {
		super(_prisma, 'supplier', logger)
	}
}