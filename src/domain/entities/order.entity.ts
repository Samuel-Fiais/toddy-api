import { BaseEntity } from "./base.entity";
import { OrderHistory } from "./history.entity";
import { OrderItem } from "./order-item.entity";
import { Supplier } from "./supplier.entity";

export class Order extends BaseEntity {
  quantity: number;
  totalValue: number;
  arrivalData: Date;

  supplierId: string;
  supplier: Supplier;

  orderItems: OrderItem[];
  orderHistories: OrderHistory[];
}
