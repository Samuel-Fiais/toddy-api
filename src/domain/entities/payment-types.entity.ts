import { Base } from "./base.entity"
import { Sale } from "./sale.entity"

export class PaymentType extends Base {
	description: string

	sale: Sale
}