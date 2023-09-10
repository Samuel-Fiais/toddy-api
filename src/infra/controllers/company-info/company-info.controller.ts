import { Controller, Get, Inject, Param } from "@nestjs/common"
import { UseCaseProxy } from "src/infra/usecases-proxy/usecases-proxy"
import { UseCaseProxyModule } from "src/infra/usecases-proxy/usecases-proxy.module"
import { GetCompanyInfoUseCase } from "src/usecases/company-info/get-company-info.usecase"


@Controller('company-info')
export class CompanyInfoController {
	constructor(
		@Inject(UseCaseProxyModule.GET_COMPANY_INFO_USECASE_PROXY)
		private readonly getCompanyInfoUseCaseProxy: UseCaseProxy<GetCompanyInfoUseCase>,
	) {}

	@Get(':cnpj')
	async findAll(@Param('cnpj') cnpj) {
		return await this.getCompanyInfoUseCaseProxy.getInstance().execute(cnpj)
	}

}