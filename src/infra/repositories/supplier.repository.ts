import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { SupplierModel } from "src/domain/model/supplier.model";
import { PrismaService } from "../database/prisma.service";
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class SupplierRepository extends BaseRepository<SupplierModel> {
	constructor(protected readonly _prisma: PrismaService, protected logger: LoggerService) {
		super(_prisma, 'supplier', logger)
	}
}