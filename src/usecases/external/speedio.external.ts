import { CompanyInfoPresenter } from "../models/presenters/company-info.presenter"
import { SpeedioEndpoint } from "./endpoints/speedio.endpoint"

export class Speedio {
	static async getInfoByCNPJ(cnpj: string) {
		const url = this.buildGetInfoByCNPJ(cnpj)

		const response = await fetch(url)
		const data = new CompanyInfoPresenter(await response.json())

		return data
	}

	static buildGetInfoByCNPJ(cnpj: string) {
		const uri = SpeedioEndpoint.endpoint()
		return `${uri}?cnpj=${cnpj}`
	}
}