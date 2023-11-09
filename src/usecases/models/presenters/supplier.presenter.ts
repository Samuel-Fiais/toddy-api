import { Supplier } from "src/domain/entities/supplier.entity";
import { GetProductPresenter as ProductPresenter } from "./product.presenter";

export class SupplierPresenter {
  id: string;
  alternateId: number;
  createdAt: Date;
  document: string;
  tradeName: string;
  companyName: string;
  phone: string;
  email: string;

  products: ProductPresenter[];

  static mapper = (entity: Supplier) => {
    if (!entity) return null;
    const model = new SupplierPresenter();
    model.id = entity.id;
    model.alternateId = entity.alternateId;
    model.createdAt = entity.createdAt;
    model.document = entity.document;
    model.tradeName = entity.tradeName;
    model.companyName = entity.companyName;
    model.phone = entity.phone;
    model.email = entity.email;

    model.products = entity.products;

    return model;
  };

  static mapperArray(entities: Array<Supplier>) {
    if (!entities) return null;
    const models = new Array<SupplierPresenter>();
    entities.forEach((entity) => models.push(SupplierPresenter.mapper(entity)));

    return models;
  }
}
