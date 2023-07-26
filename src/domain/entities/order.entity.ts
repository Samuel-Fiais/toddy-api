import { Base } from "./base.entity";
import { Supplier } from "./supplier.entity";

export class Order extends Base {
    quantity: number;
    totalValue: number;
    arrivalDate: Date;
    
    suplierId: string;
    suplier: Supplier;
    orderItems: Order[];
}