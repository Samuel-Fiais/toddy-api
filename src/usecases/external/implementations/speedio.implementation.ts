import {CompanyInfoPresenter} from "../models/presenters/company-info.presenter"
import {SpeedioEndpoint} from "./endpoints/speedio.endpoint"

export class Speedio {
	static async getInfoByCNPJ(cnpj: string) {
		const url = this.buildGetInfoByCNPJ(cnpj)

		const response = await fetch(url)
		return new CompanyInfoPresenter(await response.json())
	}

	static buildGetInfoByCNPJ(cnpj: string) {
		const uri = SpeedioEndpoint.endpoint()
		return `${uri}?cnpj=${cnpj}`
	}
}