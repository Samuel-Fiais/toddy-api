import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

export class Permission extends BaseEntity {
  description: string;
  users: User[];
}
