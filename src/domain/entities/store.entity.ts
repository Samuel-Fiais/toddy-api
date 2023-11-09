import { BaseEntity } from "./base.entity";
import { Employee } from "./employee.entity";
import { Supplier } from "./supplier.entity";

export class Store extends BaseEntity {
  name: string;
  address: string;
  document?: string | null;
  logo?: string | null;
  active: boolean;

  suppliers: Supplier[];
  employees: Employee[];
}
