import { OrderItem, SaleItem, Supplier } from "@prisma/client"
import { Base } from "./base.entity"
import { Inventory } from "./inventory.entity"

export class Product extends Base {
	description: string
	price: number
	
	supplierId: string
	supplier: Supplier
	
	inventoryId: string
	inventory: Inventory

	orderItems: OrderItem[]
	saleItems: SaleItem[]
}