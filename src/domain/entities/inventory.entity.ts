import { BaseEntity } from "./base.entity";
import { Product } from "./product.entity";

export class Inventory extends BaseEntity {
  quantity: number;

  productId: string;
  product: Product;
}
