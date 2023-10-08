import { IBaseRepository } from "./repository.interface";
import { User } from "../entities/user.entity";

export interface IUserRepositoryInterface
  extends IBaseRepository<User> {

  findByUsername(username: string): Promise<User | undefined>;
  }
