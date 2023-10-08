import { Controller, Get, Inject, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UseCaseProxy } from "src/infra/usecases-proxy/usecases-proxy";
import { GetCompanyInfoUseCase } from "src/usecases/company-info/get-company-info.usecase";
import { UseCaseProxyCompanyInfoModule } from "../../usecases-proxy/usecases-proxy.company-info.module";

@Controller("company-info")
@ApiTags("company-info")
export class CompanyInfoController {
  constructor(
    @Inject(UseCaseProxyCompanyInfoModule.GET_COMPANY_INFO_USECASE_PROXY)
    private readonly getCompanyInfoUseCaseProxy: UseCaseProxy<GetCompanyInfoUseCase>,
  ) {}

  @Get(":cnpj")
  async findAll(@Param("cnpj") cnpj: string) {
    return await this.getCompanyInfoUseCaseProxy.getInstance().execute(cnpj);
  }
}
