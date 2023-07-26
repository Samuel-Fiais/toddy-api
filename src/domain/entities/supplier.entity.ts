import { Product } from "./product.entity";

export class Supplier {
	id: string;
	alternateId: number;
	createdAt: Date;
	document: string;
	tradeName: string;
	companyName: string;
	phone: string;
	email: string;

	products: Product[]
}