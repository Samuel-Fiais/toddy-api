import { Injectable } from "@nestjs/common"
import { LoggerService } from "src/infra/logger/logger.service"
import { Speedio } from "../external/speedio.external"

@Injectable()
export class GetCompanyInfoUseCase {
	constructor(protected _logger: LoggerService) {}

	async execute(cnpj: string) {
		this._logger.log('GetCompanyInfoUseCase execute', 'Start to find a cnpj')

		const cnpjFormatted = cnpj.replace(/[^\d]+/g, '')
		const data = Speedio.getInfoByCNPJ(cnpjFormatted)

		this._logger.log('GetCompanyInfoUseCase execute', 'Searching cnpj was successful')

		return data
	}
}

