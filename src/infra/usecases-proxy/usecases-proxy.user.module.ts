import { DynamicModule, Module } from "@nestjs/common";
import { LoggerModule } from "../logger/logger.module";
import { ExceptionsModule } from "../exceptions/exception.module";
import { UseCaseProxy } from "./usecases-proxy";
import { LoggerService } from "../logger/logger.service";
import { CreateUserUseCase } from "src/usecases/users/create.user.usecase";
import { UserRepository } from "../repositories/user.repository";
import { ExceptionService } from "../exceptions/exception.service";
import { RepositoriesModule } from "../repositories/repositories.module";

@Module({
  imports: [LoggerModule, ExceptionsModule, RepositoriesModule],
})
export class UseCaseProxyUserModule {
  static CREATE_USER_USECASE_PROXY = "CREATE_USER_USECASE_PROXY";

  static register(): DynamicModule {
    return {
      module: UseCaseProxyUserModule,
      providers: [
        {
          inject: [LoggerService, UserRepository, ExceptionService],
          provide: UseCaseProxyUserModule.CREATE_USER_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: UserRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new CreateUserUseCase(logger, userRepository, exceptionService),
            ),
        },
      ],
      exports: [UseCaseProxyUserModule.CREATE_USER_USECASE_PROXY],
    };
  }
}
