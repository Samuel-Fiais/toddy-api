import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UseCaseProxy } from "src/infra/usecases-proxy/usecases-proxy";
import { UseCaseProxyAuthModule } from "src/infra/usecases-proxy/usecases-proxy.auth.module";
import { LoginUseCase } from "src/usecases/auth/login.usecase";
import { LoginDTO } from "src/usecases/models/dtos/login.dto";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(
    @Inject(UseCaseProxyAuthModule.LOGIN_USE_CASE_PROXY)
    private readonly loginUseCaseProxy: UseCaseProxy<LoginUseCase>,
  ) {}

  @Post("login")
  async login(@Body() model: LoginDTO) {
    return await this.loginUseCaseProxy.getInstance().execute(model);
  }
}
