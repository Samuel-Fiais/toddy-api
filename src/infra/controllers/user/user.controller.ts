import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UseCaseProxy } from "src/infra/usecases-proxy/usecases-proxy";
import { UseCaseProxyUserModule } from '../../usecases-proxy/usecases-proxy.user.module';
import { CreateUserUseCase } from "src/usecases/users/create.user.usecase";
import { CreateUserDTO } from "src/usecases/models/dtos/user.dto";

@Controller("user")
@ApiTags("user")
export class UserController {
  constructor(
    @Inject(UseCaseProxyUserModule.CREATE_USER_USECASE_PROXY)
    private readonly createUserUseCase: UseCaseProxy<CreateUserUseCase>,
  ) {}

  @Post()
  async login(@Body() model: CreateUserDTO) {
    return await this.createUserUseCase.getInstance().execute(model);
  }
}
