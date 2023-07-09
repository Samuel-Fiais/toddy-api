import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { UseCaseProxy } from "src/infra/usecases-proxy/usecases-proxy";
import { UseCaseProxyModule } from "src/infra/usecases-proxy/usecases-proxy.module";
import { createSupplierUseCase } from "src/usecases/supplier/createSupplierUseCase/create.supplier.usecase";
import { CreateSupplierDTO } from "src/usecases/supplier/supplier.dto";
import { getAllSupplierUseCase } from '../../../usecases/supplier/getAllSupplierUseCase/getall.supplier.usecase';

@Controller('supplier')
export class SupplierController {
	constructor(
		@Inject(UseCaseProxyModule.POST_SUPPLIER_USECASES_PROXY)
		private readonly createSupplierUsecaseProxy: UseCaseProxy<createSupplierUseCase>,
		@Inject(UseCaseProxyModule.GET_SUPPLIERS_USECASES_PROXY)
		private readonly getAllSupplierUsecaseProxy: UseCaseProxy<getAllSupplierUseCase>
	) {}

	@Post()
	async create(@Body() model: CreateSupplierDTO) {
		return await this.createSupplierUsecaseProxy.getInstance().execute(model) 
	}

	@Get()
	async findAll() {
		return await this.getAllSupplierUsecaseProxy.getInstance().execute()
	}
}