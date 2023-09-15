import { Product } from "./product.entity"
import { Base } from "./base.entity"
import { Order } from "./order.entity"

export class Supplier extends Base {
	document: string
	tradeName: string
	companyName: string
	phone: string
	email: string

	products: Product[]
	orders: Order[]
}