import { Product } from "src/domain/entities/product.entity";

export class GetProductPresenter {
  id: string;
  alternateId: number;
  createdAt: Date;
  description: string;
  price: number;
  supplierId: string;
  inventoryId: string;

  static mapper = (entity: Product) => {
    if (!entity) return null;
    const model = new GetProductPresenter();
    model.id = entity.id;
    model.alternateId = entity.alternateId;
    model.createdAt = entity.createdAt;
    model.description = entity.description;
    model.price = entity.price;
    model.supplierId = entity.supplierId;
    model.inventoryId = entity.inventoryId;

    return model;
  };

  static mapperArray(entities: Array<Product>) {
    if (!entities) return null;
    const models = new Array<GetProductPresenter>();
    entities.forEach((entity) =>
      models.push(GetProductPresenter.mapper(entity)),
    );

    return models;
  }
}
