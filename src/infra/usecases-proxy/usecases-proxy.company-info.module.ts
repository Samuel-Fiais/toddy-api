import { DynamicModule, Module } from "@nestjs/common";
import { LoggerModule } from "../logger/logger.module";
import { ExceptionsModule } from "../exceptions/exception.module";
import { UseCaseProxy } from "./usecases-proxy";
import { LoggerService } from "../logger/logger.service";
import { GetCompanyInfoUseCase } from "src/usecases/company-info/get-company-info.usecase";
import { SpeedioImplementation } from "../external/implementations/speedio.implementation";
import { ExternalModule } from "../external/external.module";

@Module({
  imports: [LoggerModule, ExceptionsModule, ExternalModule],
})
export class UseCaseProxyCompanyInfoModule {
  static GET_COMPANY_INFO_USECASE_PROXY = "GetCompanyInfoUseCaseProxy";

  static register(): DynamicModule {
    return {
      module: UseCaseProxyCompanyInfoModule,
      providers: [
        {
          inject: [LoggerService, SpeedioImplementation],
          provide: UseCaseProxyCompanyInfoModule.GET_COMPANY_INFO_USECASE_PROXY,
          useFactory: (logger: LoggerService, speedio: SpeedioImplementation) =>
            new UseCaseProxy(new GetCompanyInfoUseCase(logger, speedio)),
        },
      ],
      exports: [UseCaseProxyCompanyInfoModule.GET_COMPANY_INFO_USECASE_PROXY],
    };
  }
}
