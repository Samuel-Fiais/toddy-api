import { SupplierModel } from "src/domain/model/supplier.model"

export class GetSupplierPresenter {
	id: string
	alternateId: number
	createdAt: Date
	document: string
	tradeName: string
	companyName: string
	phone: string
	email: string

	constructor(model: SupplierModel) {
		this.id = model.id
		this.alternateId = model.alternateId
		this.createdAt = model.createdAt
		this.document = model.document
		this.tradeName = model.tradeName
		this.companyName = model.companyName
		this.phone = model.phone
		this.email = model.email
	}

	static convertList(modelList: Array<SupplierModel>) {
		return modelList.map(model => new GetSupplierPresenter(model))
	}
}