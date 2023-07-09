import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { UseCaseProxy } from "src/infra/usecases-proxy/usecases-proxy";
import { UseCaseProxyModule } from "src/infra/usecases-proxy/usecases-proxy.module";
import { createSupplierUseCase } from "src/usecases/supplier/create.supplier.usecase";
import { CreateSupplierDTO } from "src/usecases/supplier/supplier.dto";
import { getAllSupplierUseCase } from '../../../usecases/supplier/getall.supplier.usecase';
import { getByIdSupplierUseCase } from '../../../usecases/supplier/getbyid.supplier.usecase';

@Controller('supplier')
export class SupplierController {
	constructor(
		@Inject(UseCaseProxyModule.GET_SUPPLIER_USECASES_PROXY)
		private readonly getByIdSupplierUseCaseProxy: UseCaseProxy<getByIdSupplierUseCase>,
		@Inject(UseCaseProxyModule.GET_SUPPLIERS_USECASES_PROXY)
		private readonly getAllSupplierUsecaseProxy: UseCaseProxy<getAllSupplierUseCase>,
		@Inject(UseCaseProxyModule.POST_SUPPLIER_USECASES_PROXY)
		private readonly createSupplierUsecaseProxy: UseCaseProxy<createSupplierUseCase>,
	) {}

	@Get()
	async findAll() {
		return await this.getAllSupplierUsecaseProxy.getInstance().execute()
	}

	// Get by id
	@Get(':id')
    async findById(@Param('id') id: string) {
        return await this.getByIdSupplierUseCaseProxy.getInstance().execute(id)
    }

	@Post()
	async create(@Body() model: CreateSupplierDTO) {
		return await this.createSupplierUsecaseProxy.getInstance().execute(model) 
	}
}