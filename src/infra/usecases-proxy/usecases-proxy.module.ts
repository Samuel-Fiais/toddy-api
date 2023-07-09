import { DynamicModule, Module } from "@nestjs/common";
import { LoggerModule } from "../logger/logger.module";
import { RepositoriesModule } from "../repositories/repositories.module";
import { ExceptionsModule } from "../exceptions/exception.module";
import { SupplierRepository } from "../repositories/supplier.repository";
import { UseCaseProxy } from "./usecases-proxy";
import { createSupplierUseCase } from "src/usecases/supplier/createSupplierUseCase/create.supplier.usecase";
import { LoggerService } from "../logger/logger.service";
import { getAllSupplierUseCase } from "src/usecases/supplier/getAllSupplierUseCase/getAll.supplier.usecase";

@Module({
	imports: [LoggerModule, RepositoriesModule, ExceptionsModule]
})
export class UseCaseProxyModule {
	static GET_SUPPLIER_USECASES_PROXY = 'getSupplierUseCasesProxy'
	static GET_SUPPLIERS_USECASES_PROXY = 'getSuppliersUseCasesProxy'
	static POST_SUPPLIER_USECASES_PROXY = 'postSupplierUseCasesProxy'
	static PUT_SUPPLIER_USECASES_PROXY = 'putSupplierUseCasesProxy'
	static DELETE_SUPPLIER_USECASES_PROXY = 'deleteSupplierUseCasesProxy'

	static register(): DynamicModule {
		return {
			module: UseCaseProxyModule,
			providers: [
				{
					inject: [LoggerService, SupplierRepository],
					provide: UseCaseProxyModule.POST_SUPPLIER_USECASES_PROXY,
					useFactory: (logger: LoggerService, supplierRepository: SupplierRepository) => new UseCaseProxy(
						new createSupplierUseCase(logger, supplierRepository)),
				},
				{
					inject: [LoggerService, SupplierRepository],
					provide: UseCaseProxyModule.GET_SUPPLIERS_USECASES_PROXY,
					useFactory: (logger: LoggerService, supplierRepository: SupplierRepository) => new UseCaseProxy(
                        new getAllSupplierUseCase(logger, supplierRepository)),
				}
			],
			exports: [
				UseCaseProxyModule.POST_SUPPLIER_USECASES_PROXY,
				UseCaseProxyModule.GET_SUPPLIERS_USECASES_PROXY
			]
		}
	}
}