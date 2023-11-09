import { DynamicModule, Module } from "@nestjs/common";
import { LoggerModule } from "../logger/logger.module";
import { RepositoriesModule } from "../repositories/repositories.module";
import { ExceptionsModule } from "../exceptions/exception.module";
import { UseCaseProxy } from "./usecases-proxy";
import { LoggerService } from "../logger/logger.service";
import { ExceptionService } from "../exceptions/exception.service";
import { GetAllStoreUseCase } from '../../usecases/store/get-all.store.usecase';
import { StoreRepository } from '../repositories/store.repository';

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class UseCaseProxyStoreModule {
  static GET_STORE_USECASE_PROXY = "GetStoreUseCaseProxy";

  static register(): DynamicModule {
    return {
      module: UseCaseProxyStoreModule,
      providers: [
        {
          inject: [LoggerService, StoreRepository, ExceptionService],
          provide: UseCaseProxyStoreModule.GET_STORE_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            storeRepository: StoreRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new GetAllStoreUseCase(
                logger,
                storeRepository,
                exceptionService,
              ),
            ),
        },
      ],
      exports: [
        UseCaseProxyStoreModule.GET_STORE_USECASE_PROXY,
      ],
    };
  }
}
