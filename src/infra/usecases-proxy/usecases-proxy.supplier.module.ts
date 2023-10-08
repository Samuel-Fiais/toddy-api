import { DynamicModule, Module } from "@nestjs/common";
import { LoggerModule } from "../logger/logger.module";
import { RepositoriesModule } from "../repositories/repositories.module";
import { ExceptionsModule } from "../exceptions/exception.module";
import { SupplierRepository } from "../repositories/supplier.repository";
import { UseCaseProxy } from "./usecases-proxy";
import { CreateSupplierUseCase } from "src/usecases/supplier/create.supplier.usecase";
import { LoggerService } from "../logger/logger.service";
import { GetAllSupplierUseCase } from "src/usecases/supplier/get-all.supplier.usecase";
import { GetByIdSupplierUseCase } from "src/usecases/supplier/get-by-id.supplier.usecase";
import { UpdateSupplierUseCase } from "src/usecases/supplier/update.supplier.usecase";
import { DeleteSupplierUseCase } from "src/usecases/supplier/delete.supplier.usecase";
import { ExceptionService } from "../exceptions/exception.service";

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class UseCaseProxySupplierModule {
  static GET_SUPPLIER_USECASE_PROXY = "GetSupplierUseCaseProxy";
  static GET_SUPPLIERS_USECASE_PROXY = "GetSuppliersUseCaseProxy";
  static POST_SUPPLIER_USECASE_PROXY = "PostSupplierUseCaseProxy";
  static PUT_SUPPLIER_USECASE_PROXY = "PutSupplierUseCaseProxy";
  static DELETE_SUPPLIER_USECASE_PROXY = "DeleteSupplierUseCaseProxy";

  static register(): DynamicModule {
    return {
      module: UseCaseProxySupplierModule,
      providers: [
        {
          inject: [LoggerService, SupplierRepository, ExceptionService],
          provide: UseCaseProxySupplierModule.GET_SUPPLIER_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            supplierRepository: SupplierRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new GetByIdSupplierUseCase(
                logger,
                supplierRepository,
                exceptionService,
              ),
            ),
        },
        {
          inject: [LoggerService, SupplierRepository, ExceptionService],
          provide: UseCaseProxySupplierModule.GET_SUPPLIERS_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            supplierRepository: SupplierRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new GetAllSupplierUseCase(
                logger,
                supplierRepository,
                exceptionService,
              ),
            ),
        },
        {
          inject: [LoggerService, SupplierRepository, ExceptionService],
          provide: UseCaseProxySupplierModule.POST_SUPPLIER_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            supplierRepository: SupplierRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new CreateSupplierUseCase(
                logger,
                supplierRepository,
                exceptionService,
              ),
            ),
        },
        {
          inject: [LoggerService, SupplierRepository, ExceptionService],
          provide: UseCaseProxySupplierModule.PUT_SUPPLIER_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            supplierRepository: SupplierRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new UpdateSupplierUseCase(
                logger,
                supplierRepository,
                exceptionService,
              ),
            ),
        },
        {
          inject: [LoggerService, SupplierRepository, ExceptionService],
          provide: UseCaseProxySupplierModule.DELETE_SUPPLIER_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            supplierRepository: SupplierRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new DeleteSupplierUseCase(
                logger,
                supplierRepository,
                exceptionService,
              ),
            ),
        },
      ],
      exports: [
        UseCaseProxySupplierModule.GET_SUPPLIER_USECASE_PROXY,
        UseCaseProxySupplierModule.GET_SUPPLIERS_USECASE_PROXY,
        UseCaseProxySupplierModule.POST_SUPPLIER_USECASE_PROXY,
        UseCaseProxySupplierModule.PUT_SUPPLIER_USECASE_PROXY,
        UseCaseProxySupplierModule.DELETE_SUPPLIER_USECASE_PROXY,
      ],
    };
  }
}
