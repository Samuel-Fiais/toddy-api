import { Base } from "./base.entity";
import { Order } from "./order.entity";

export class TotalOrders extends Base {
    quantity: number;
    totalValue: number;
    arrivalDate: Date;
    orders: Order[];
}