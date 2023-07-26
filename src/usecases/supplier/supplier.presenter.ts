import { Supplier } from "src/domain/entities/supplier.entity"

export class GetSupplierPresenter {
	id: string
	alternateId: number
	createdAt: Date
	document: string
	tradeName: string
	companyName: string
	phone: string
	email: string

	static mapper = (entity: Supplier) => {
		const model = new GetSupplierPresenter()
		model.id = entity.id
		model.alternateId = entity.alternateId
		model.createdAt = entity.createdAt
		model.document = entity.document
		model.tradeName = entity.tradeName
		model.companyName = entity.companyName
		model.phone = entity.phone
		model.email = entity.email

		return model
	}

	static mapperArray(entities: Array<Supplier>) {
		const models = new Array<GetSupplierPresenter>()
		entities.forEach(entity => models.push(GetSupplierPresenter.mapper(entity)))

		return models
	}
}