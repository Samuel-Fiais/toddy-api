import { BaseEntity } from "./base.entity";
import { Sale } from "./sale.entity";

export class PaymentType extends BaseEntity {
  description: string;

  saleId: string;
  sale: Sale;
}
