import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { UseCaseProxy } from "src/infra/usecases-proxy/usecases-proxy";
import { UseCaseProxyModule } from "src/infra/usecases-proxy/usecases-proxy.module";
import { createSupplierUseCase } from "src/usecases/supplier/create.supplier.usecase";
import { CreateSupplierDTO, UpdateSupplierDTO } from "src/usecases/models/dtos/supplier.dto";
import { getAllSupplierUseCase } from '../../../usecases/supplier/get-all.supplier.usecase';
import { getByIdSupplierUseCase } from '../../../usecases/supplier/get-by-id.supplier.usecase';
import { updateSupplierUseCase } from "src/usecases/supplier/update.supplier.usecase";
import { deleteSupplierUseCase } from "src/usecases/supplier/delete.supplier.usecase";

@Controller('supplier')
export class SupplierController {
	constructor(
		@Inject(UseCaseProxyModule.GET_SUPPLIER_USECASES_PROXY)
		private readonly getByIdSupplierUseCaseProxy: UseCaseProxy<getByIdSupplierUseCase>,
		@Inject(UseCaseProxyModule.GET_SUPPLIERS_USECASES_PROXY)
		private readonly getAllSupplierUsecaseProxy: UseCaseProxy<getAllSupplierUseCase>,
		@Inject(UseCaseProxyModule.POST_SUPPLIER_USECASES_PROXY)
		private readonly createSupplierUsecaseProxy: UseCaseProxy<createSupplierUseCase>,
		@Inject(UseCaseProxyModule.PUT_SUPPLIER_USECASES_PROXY)
        private readonly updateSupplierUsecaseProxy: UseCaseProxy<updateSupplierUseCase>,
		@Inject(UseCaseProxyModule.DELETE_SUPPLIER_USECASES_PROXY)
        private readonly deleteSupplierUsecaseProxy: UseCaseProxy<deleteSupplierUseCase>
	) {}

	@Get()
	async findAll() {
		return await this.getAllSupplierUsecaseProxy.getInstance().execute()
	}

	@Get(':id')
    async findById(@Param('id') id: string) {
        return await this.getByIdSupplierUseCaseProxy.getInstance().execute(id)
    }

	@Post()
	async create(@Body() model: CreateSupplierDTO) {
		return await this.createSupplierUsecaseProxy.getInstance().execute(model) 
	}

	@Put()
	async update(@Body() model: UpdateSupplierDTO) {
		return await this.updateSupplierUsecaseProxy.getInstance().execute(model)
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.deleteSupplierUsecaseProxy.getInstance().execute(id)
	}
}