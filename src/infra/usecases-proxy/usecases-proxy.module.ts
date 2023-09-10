import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { ExceptionsModule } from '../exceptions/exception.module';
import { SupplierRepository } from '../repositories/supplier.repository';
import { UseCaseProxy } from './usecases-proxy';
import { CreateSupplierUseCase } from 'src/usecases/supplier/create.supplier.usecase';
import { LoggerService } from '../logger/logger.service';
import { GetAllSupplierUseCase } from 'src/usecases/supplier/get-all.supplier.usecase';
import { GetByIdSupplierUseCase } from 'src/usecases/supplier/get-by-id.supplier.usecase';
import { UpdateSupplierUseCase } from 'src/usecases/supplier/update.supplier.usecase';
import { DeleteSupplierUseCase } from 'src/usecases/supplier/delete.supplier.usecase';
import { GetCompanyInfoUseCase } from 'src/usecases/company-info/get-company-info.usecase';

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class UseCaseProxyModule {
  static GET_SUPPLIER_USECASE_PROXY = 'GetSupplierUseCaseProxy';
  static GET_SUPPLIERS_USECASE_PROXY = 'GetSuppliersUseCaseProxy';
  static POST_SUPPLIER_USECASE_PROXY = 'PostSupplierUseCaseProxy';
  static PUT_SUPPLIER_USECASE_PROXY = 'PutSupplierUseCaseProxy';
  static DELETE_SUPPLIER_USECASE_PROXY = 'DeleteSupplierUseCaseProxy';

  static GET_COMPANY_INFO_USECASE_PROXY = 'GetCompanyInfoUseCaseProxy';

  static register(): DynamicModule {
    return {
      module: UseCaseProxyModule,
      providers: [
        // Supplier
        {
          inject: [LoggerService, SupplierRepository],
          provide: UseCaseProxyModule.GET_SUPPLIER_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            supplierRepository: SupplierRepository,
          ) =>
            new UseCaseProxy(
              new GetByIdSupplierUseCase(logger, supplierRepository),
            ),
        },
        {
          inject: [LoggerService, SupplierRepository],
          provide: UseCaseProxyModule.GET_SUPPLIERS_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            supplierRepository: SupplierRepository,
          ) =>
            new UseCaseProxy(
              new GetAllSupplierUseCase(logger, supplierRepository),
            ),
        },
        {
          inject: [LoggerService, SupplierRepository],
          provide: UseCaseProxyModule.POST_SUPPLIER_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            supplierRepository: SupplierRepository,
          ) =>
            new UseCaseProxy(
              new CreateSupplierUseCase(logger, supplierRepository),
            ),
        },
        {
          inject: [LoggerService, SupplierRepository],
          provide: UseCaseProxyModule.PUT_SUPPLIER_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            supplierRepository: SupplierRepository,
          ) =>
            new UseCaseProxy(
              new UpdateSupplierUseCase(logger, supplierRepository),
            ),
        },
        {
          inject: [LoggerService, SupplierRepository],
          provide: UseCaseProxyModule.DELETE_SUPPLIER_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            supplierRepository: SupplierRepository,
          ) =>
            new UseCaseProxy(
              new DeleteSupplierUseCase(logger, supplierRepository),
            ),
        },
        // CNPJ
        {
          inject: [LoggerService],
          provide: UseCaseProxyModule.GET_COMPANY_INFO_USECASE_PROXY,
          useFactory: (logger: LoggerService) =>
            new UseCaseProxy(new GetCompanyInfoUseCase(logger)),
        },
      ],
      exports: [
        UseCaseProxyModule.GET_SUPPLIER_USECASE_PROXY,
        UseCaseProxyModule.GET_SUPPLIERS_USECASE_PROXY,
        UseCaseProxyModule.POST_SUPPLIER_USECASE_PROXY,
        UseCaseProxyModule.PUT_SUPPLIER_USECASE_PROXY,
        UseCaseProxyModule.DELETE_SUPPLIER_USECASE_PROXY,

        UseCaseProxyModule.GET_COMPANY_INFO_USECASE_PROXY,
      ],
    };
  }
}
