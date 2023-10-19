import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/domain/entities/user.entity";

export class CreateUserDTO {
  @ApiProperty({ example: "username", type: "string" })
  username: string;

  @ApiProperty({ example: "email@dominio.com", type: "string" })
  email: string;

  @ApiProperty({ example: "password", type: "string" })
  password: string;

  static mapper = (model: CreateUserDTO) => {
    const entity = new User();
    entity.username = model.username;
    entity.email = model.email;
    entity.password = model.password;

    return entity;
  };
}
