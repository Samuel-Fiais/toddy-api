import { IBaseRepository } from "./repository.interface";
import { User } from "../entities/user.entity";

export interface IUserRepository extends IBaseRepository<User> {}
