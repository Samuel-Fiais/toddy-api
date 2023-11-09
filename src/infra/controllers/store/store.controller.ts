import { Controller, Get, Inject } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UseCaseProxy } from "src/infra/usecases-proxy/usecases-proxy";
import { Permission } from "src/infra/common/decorators/permission.decorator";
import { PermissionsEnum } from "src/infra/enums/permission.enum";
import { GetAllStoreUseCase } from 'src/usecases/store/get-all.store.usecase';
import { UseCaseProxyStoreModule } from 'src/infra/usecases-proxy/usecases-proxy.store.module';

@Controller("store")
@ApiTags("store")
export class StoreController {
  constructor(
    @Inject(UseCaseProxyStoreModule.GET_STORE_USECASE_PROXY)
    private readonly getAllUseCaseProxy: UseCaseProxy<GetAllStoreUseCase>,
  ) {}
  
  @Permission(PermissionsEnum.STORES_READ)
  @Get()
  async findAll() {
    return await this.getAllUseCaseProxy.getInstance().execute();
  }
}
