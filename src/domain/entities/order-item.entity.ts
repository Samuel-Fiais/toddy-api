import { Base } from "./base.entity"
import { Product } from "./product.entity"
import { Order } from "./order.entity"

export class OrderItem extends Base {
    quantity: number
    totalValue: number
    
    productId: string
    product: Product
    
    orderId: string
    order: Order
}