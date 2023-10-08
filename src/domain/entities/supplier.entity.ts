import { BaseEntity } from "./base.entity";
import { Product } from "./product.entity";
import { Order } from "./order.entity";
import { SupplierHistory } from "./history.entity";
import { Store } from "./store.entity";

export class Supplier extends BaseEntity {
  document: string;
  tradeName: string;
  companyName: string;
  phone: string;
  email: string;

  storeId: string;
  store: Store;

  products: Product[];
  orders: Order[];
  supplierHistories: SupplierHistory[];
}
