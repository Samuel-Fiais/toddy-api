import { Base } from "./base.entity";
import { Supplier } from "./supplier.entity";
import { TotalOrders } from "./total-orders.entity";

export class Order extends Base {
    quantity: number;
    totalValue: number;
    arrivalDate: Date;
    
    supplierId: string;
    supplier: Supplier;
    
    totalOrdersId: string;
    totalOrders: TotalOrders;
}