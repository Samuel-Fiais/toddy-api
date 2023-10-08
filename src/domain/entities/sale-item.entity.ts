import { BaseEntity } from "./base.entity";
import { Product } from "./product.entity";
import { Sale } from "./sale.entity";

export class SaleItem extends BaseEntity {
  quantity: number;
  totalValue: number;

  saleId: string;
  sale: Sale;
  productId: string;
  product: Product;
}
