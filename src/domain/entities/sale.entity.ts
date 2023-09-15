import { Base } from "./base.entity"
import { SaleItem } from "@prisma/client"
import { PaymentType } from "./payment-types.entity"

export class Sale extends Base {
	quantity: number
	totalValue: number
	cardDiscount: number
	
	paymentId: string
	payment: PaymentType

	saleItems: SaleItem[]
}