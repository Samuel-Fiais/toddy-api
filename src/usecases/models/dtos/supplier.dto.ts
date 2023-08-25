import { Supplier } from "src/domain/entities/supplier.entity"

export class CreateSupplierDTO {
	document: string = ''
	tradeName: string = ''
	companyName: string = ''
	phone: string = ''
	email: string = ''

	static mapper = (model: CreateSupplierDTO) => {
		const entity = new Supplier();
		entity.document = model.document;
		entity.tradeName = model.tradeName;
		entity.companyName = model.companyName;
		entity.phone = model.phone;
		entity.email = model.email;

		return entity;
	}
}

export class UpdateSupplierDTO extends CreateSupplierDTO {
	id: string
	alternateId: number
	createdAt: Date

	static mapper = (model: UpdateSupplierDTO) => {
		const entity = new Supplier()
		entity.id = model.id
		entity.alternateId = model.alternateId
		entity.createdAt = model.createdAt
		entity.document = model.document
		entity.tradeName = model.tradeName
		entity.companyName = model.companyName
		entity.phone = model.phone
		entity.email = model.email

		return entity
	}
}