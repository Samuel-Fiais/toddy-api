import { BaseEntity } from "./base.entity";
import { ProductHistory } from "./history.entity";
import { Inventory } from "./inventory.entity";
import { OrderItem } from "./order-item.entity";
import { SaleItem } from "./sale-item.entity";
import { Supplier } from "./supplier.entity";

export class Product extends BaseEntity {
  description: string;
  price: number;
  isBulk: boolean;
  conversion?: number;

  supplierId: string;
  supplier: Supplier;

  inventoryId: string;
  inventory: Inventory;

  orderItems: OrderItem[];
  saleItems: SaleItem[];
  productHistories: ProductHistory[];
}
