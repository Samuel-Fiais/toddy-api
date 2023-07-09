import { CreateSupplierDTO } from "src/usecases/supplier/supplier.dto";

export class SupplierModel {
	id: string;
	alternateId: number;
	createdAt: Date;
	document: string;
	tradeName: string;
	companyName: string;
	phone: string;
	email: string;

	constructor (model: CreateSupplierDTO) {
		this.tradeName = model.tradeName
		this.companyName = model.companyName
		this.document = model.document
		this.email = model.email
		this.phone = model.phone
	}
}