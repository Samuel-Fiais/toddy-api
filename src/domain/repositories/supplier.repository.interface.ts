import { IBaseRepository } from "./repository.interface";
import { Supplier } from "@prisma/client";

export interface ISupplierRepository
  extends IBaseRepository<Supplier> {}
