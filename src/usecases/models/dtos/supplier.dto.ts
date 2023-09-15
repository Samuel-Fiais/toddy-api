import { ApiProperty } from "@nestjs/swagger"
import { Supplier } from "src/domain/entities/supplier.entity"

export class CreateSupplierDTO {
	@ApiProperty({ example: '00000000000', type: 'string' })
	document: string = ''

	@ApiProperty({ example: 'Fornecedor 1', type: 'string' })
	tradeName: string = ''

	@ApiProperty({ example: 'Empresa 1', type: 'string' })
	companyName: string = ''

	@ApiProperty({ example: '00000000000', type: 'string' })
	phone: string = ''

	@ApiProperty({ example: 'email@dominio.com', type: 'string' })
	email: string = ''

	static mapper = (model: CreateSupplierDTO) => {
		const entity = new Supplier()
		entity.document = model.document
		entity.tradeName = model.tradeName
		entity.companyName = model.companyName
		entity.phone = model.phone
		entity.email = model.email

		return entity
	}
}

export class UpdateSupplierDTO extends CreateSupplierDTO {
	@ApiProperty({ example: '00000000-0000-0000-0000-000000000000', type: 'string' })
	id: string

	@ApiProperty({ example: 1, type: 'number' })
	alternateId: number

	static mapper = (model: UpdateSupplierDTO) => {
		const entity = new Supplier()
		entity.id = model.id
		entity.alternateId = model.alternateId
		entity.document = model.document
		entity.tradeName = model.tradeName
		entity.companyName = model.companyName
		entity.phone = model.phone
		entity.email = model.email

		return entity
	}
}