import { BaseEntity } from "./base.entity";
import { Employee } from "./employee.item.entity";
import { Order } from "./order.entity";
import { Product } from "./product.entity";
import { Sale } from "./sale.entity";
import { Supplier } from "./supplier.entity";
import { User } from "./user.entity";

export class EmployeeHistory extends BaseEntity {
  employeeId: string;
  employee: Employee;
  action: string;
  timestamp: Date;
}

export class ProductHistory extends BaseEntity {
  productId: string;
  product: Product;
  action: string;
  timestamp: Date;
}

export class SupplierHistory extends BaseEntity {
  supplierId: string;
  supplier: Supplier;
  action: string;
  timestamp: Date;
}

export class OrderHistory extends BaseEntity {
  orderId: string;
  order: Order;
  action: string;
  timestamp: Date;
}

export class SaleHistory extends BaseEntity {
  saleId: string;
  sale: Sale;
  action: string;
  timestamp: Date;
}

export class UserHistory extends BaseEntity {
  userId: string;
  user: User;
  action: string;
  timestamp: Date;
}
