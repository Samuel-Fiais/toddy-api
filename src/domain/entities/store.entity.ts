import { BaseEntity } from "./base.entity";
import { Employee } from "./employee.item.entity";
import { Supplier } from "./supplier.entity";

export class Store extends BaseEntity {
  name: string;
  address: string;

  suppliers: Supplier[];
  employees: Employee[];
}
