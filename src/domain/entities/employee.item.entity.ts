import { BaseEntity } from "./base.entity";
import { EmployeeHistory } from "./history.entity";
import { Store } from "./store.entity";
import { User } from "./user.entity";

export class Employee extends BaseEntity {
  name: string;
  document: string;
  phone: string;
  email: string;

  storeId: string;
  store: Store;

  user: User;
  employeeHistories: EmployeeHistory[];
}
