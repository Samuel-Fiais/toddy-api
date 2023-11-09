import { IBaseRepository } from "./repository.interface";
import { Store } from '../entities/store.entity';

export interface IStoreRepository extends IBaseRepository<Store> {}
