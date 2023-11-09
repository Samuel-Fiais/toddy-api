import { Supplier } from '../entities/supplier.entity';
import { IBaseRepository } from "./repository.interface";

export interface ISupplierRepository extends IBaseRepository<Supplier> {}
