import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { UseCaseProxy } from "src/infra/usecases-proxy/usecases-proxy";
import { UseCaseProxySupplierModule } from "src/infra/usecases-proxy/usecases-proxy.supplier.module";
import { CreateSupplierUseCase } from "src/usecases/supplier/create.supplier.usecase";
import {
  CreateSupplierDTO,
  UpdateSupplierDTO,
} from "src/usecases/models/dtos/supplier.dto";
import { GetAllSupplierUseCase } from "../../../usecases/supplier/get-all.supplier.usecase";
import { GetByIdSupplierUseCase } from "../../../usecases/supplier/get-by-id.supplier.usecase";
import { UpdateSupplierUseCase } from "src/usecases/supplier/update.supplier.usecase";
import { DeleteSupplierUseCase } from "src/usecases/supplier/delete.supplier.usecase";
import { ApiTags } from "@nestjs/swagger";

@Controller("supplier")
@ApiTags("supplier")
export class SupplierController {
  constructor(
    @Inject(UseCaseProxySupplierModule.GET_SUPPLIER_USECASE_PROXY)
    private readonly getByIdSupplierUseCaseProxy: UseCaseProxy<GetByIdSupplierUseCase>,
    @Inject(UseCaseProxySupplierModule.GET_SUPPLIERS_USECASE_PROXY)
    private readonly getAllSupplierUsecaseProxy: UseCaseProxy<GetAllSupplierUseCase>,
    @Inject(UseCaseProxySupplierModule.POST_SUPPLIER_USECASE_PROXY)
    private readonly createSupplierUsecaseProxy: UseCaseProxy<CreateSupplierUseCase>,
    @Inject(UseCaseProxySupplierModule.PUT_SUPPLIER_USECASE_PROXY)
    private readonly updateSupplierUsecaseProxy: UseCaseProxy<UpdateSupplierUseCase>,
    @Inject(UseCaseProxySupplierModule.DELETE_SUPPLIER_USECASE_PROXY)
    private readonly deleteSupplierUsecaseProxy: UseCaseProxy<DeleteSupplierUseCase>,
  ) {}

  @Get()
  async findAll() {
    return await this.getAllSupplierUsecaseProxy.getInstance().execute();
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    return await this.getByIdSupplierUseCaseProxy.getInstance().execute(id);
  }

  @Post()
  async create(@Body() model: CreateSupplierDTO) {
    return await this.createSupplierUsecaseProxy.getInstance().execute(model);
  }

  @Put()
  async update(@Body() model: UpdateSupplierDTO) {
    return await this.updateSupplierUsecaseProxy.getInstance().execute(model);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return await this.deleteSupplierUsecaseProxy.getInstance().execute(id);
  }
}
