import { Base } from "./base.entity";
import { Product } from "./product.entity";

export class Inventory extends Base {
    quantity: number;
    productId: string;
    product: Product;
}