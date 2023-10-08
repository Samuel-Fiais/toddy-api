import { BaseEntity } from "./base.entity";
import { SaleItem } from "@prisma/client";
import { PaymentType } from "./payment-types.entity";
import { SaleHistory } from "./history.entity";

export class Sale extends BaseEntity {
  quantity: number;
  totalValue: number;
  cardDiscount: number;

  paymentTypeId: string;
  payment: PaymentType;

  saleItems: SaleItem[];
  saleHistories: SaleHistory[];
}
