import { DynamicModule, Module } from "@nestjs/common";
import { UseCaseProxy } from "./usecases-proxy";
import { UserRepository } from "../repositories/user.repository";
import { RepositoriesModule } from "../repositories/repositories.module";
import { LoginUseCase } from "src/usecases/auth/login.usecase";
import { ExceptionService } from "../exceptions/exception.service";
import { LoggerService } from "../logger/logger.service";
import { LoggerModule } from "../logger/logger.module";
import { ExceptionsModule } from "../exceptions/exception.module";
import { JwtTokenService } from "../services/jwt/jwt.service";
import { JwtModule } from "../services/jwt/jwt.module";
import { BcryptService } from "../services/bcrypt/bcrypt.service";
import { BcryptModule } from "../services/bcrypt/bcrypt.module";

@Module({
  imports: [
    LoggerModule,
    RepositoriesModule,
    ExceptionsModule,
    JwtModule,
    BcryptModule,
  ],
})
export class UseCaseProxyAuthModule {
  static LOGIN_USE_CASE_PROXY = "LoginUseCaseProxy";

  static register(): DynamicModule {
    return {
      module: UseCaseProxyAuthModule,
      providers: [
        {
          inject: [
            LoggerService,
            UserRepository,
            ExceptionService,
            JwtTokenService,
            BcryptService,
          ],
          provide: UseCaseProxyAuthModule.LOGIN_USE_CASE_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: UserRepository,
            exceptionService: ExceptionService,
            jwtService: JwtTokenService,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new LoginUseCase(
                logger,
                userRepository,
                exceptionService,
                jwtService,
                bcryptService,
              ),
            ),
        },
      ],
      exports: [UseCaseProxyAuthModule.LOGIN_USE_CASE_PROXY],
    };
  }
}
