import { Employee } from 'src/domain/entities/employee.entity';
import { StorePresenter } from './store.presenter';
import { UserPresenter } from './user.presenter';

export class EmployeePresenter {
  name: string;
  document: string;
  phone: string;
  email: string;
  storeId: string;
  store: StorePresenter;
  user: UserPresenter;

  static mapper = (entity: Employee) => {
    if (!entity) return null;
    const model = new EmployeePresenter();
    model.name = entity.name;
    model.document = entity.document;
    model.phone = entity.phone;
    model.email = entity.email;
    model.storeId = entity.storeId;

    model.store = StorePresenter.mapper(entity.store);
    model.user = UserPresenter.mapper(entity.user);

    return model;
  }

  static mapperArray(entities: Array<Employee>) {
    if (!entities) return null;
    const models = new Array<EmployeePresenter>();
    entities.forEach((entity) => models.push(EmployeePresenter.mapper(entity)));

    return models;
  }
}