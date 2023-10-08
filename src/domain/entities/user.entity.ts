import { BaseEntity } from "./base.entity";
import { Employee } from "./employee.item.entity";
import { Permission } from "./permission.entity";
import { UserHistory } from "./history.entity";

export class User extends BaseEntity {
  username: string;
  email: string;
  password: string;

  employeeId?: string;
  employee?: Employee;

  permissions?: Permission[];
  userHistories?: UserHistory[];
}
