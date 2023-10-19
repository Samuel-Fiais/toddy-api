import { User } from "src/domain/entities/user.entity";

export class UserPresenter {
  id: string;
  alternateId: number;
  createdAt: Date;
  username: string;
  email: string;

  static mapper = (entity: User) => {
    const model = new UserPresenter();
    model.id = entity.id;
    model.alternateId = entity.alternateId;
    model.createdAt = entity.createdAt;
    model.username = entity.username;
    model.email = entity.email;

    return model;
  };

  static mapperArray(entities: Array<User>) {
    const models = new Array<UserPresenter>();
    entities.forEach((entity) => models.push(UserPresenter.mapper(entity)));

    return models;
  }
}
