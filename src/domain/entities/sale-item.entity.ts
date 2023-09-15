import { Base } from "./base.entity"
import { Product } from "./product.entity"
import { Sale } from "./sale.entity"

export class SaleItem extends Base {
	description: string
	quantity: number
	totalValue: number
	
	saleId: string
	sales: Sale

	productId: string
	product: Product
}