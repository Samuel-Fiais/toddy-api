import { Injectable } from "@nestjs/common";
import { ExceptionService } from "src/infra/exceptions/exception.service";
import { LoggerService } from "src/infra/logger/logger.service";
import { ValidationUtils } from "src/infra/common/utils/validation.utils";
import { CreateUserDTO } from "../models/dtos/user.dto";
import { UserPresenter } from "../models/presenters/user.presenter";
import { createUserSchema } from "../models/schemas/user.schemas";
import { UserRepository } from "src/infra/repositories/user.repository";

import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly _logger: LoggerService,
    private readonly _userRepository: UserRepository,
    private readonly _exceptionService: ExceptionService,
  ) {}

  async execute(model: CreateUserDTO): Promise<UserPresenter> {
    try {
      this._logger.log(
        "CreateUserUseCase execute",
        "Start to create a new user",
      );

      const validation = new ValidationUtils<CreateUserDTO>(
        createUserSchema,
      );
      const hasError = await validation.validateSchema(model);

      if (hasError)
        this._exceptionService.applicationValuesRequisitionInvalid(
          "Usuário",
          hasError,
        );

      await this._validateUserExists(model.username, model.email);

      const entity = CreateUserDTO.mapper(model);
      entity.password = await this._hashPassword(entity.password);
      const userInserted = await this._userRepository.create(entity);

      this._logger.log(
        "CreateUserUseCase execute",
        `New user have be inserted - ID ${userInserted.id}`,
      );

      return userInserted;
    } catch (e) {
      this._logger.error(
        "CreateUserUseCase execute",
        "Error when try to create a new user",
      );
      if (e as ExceptionService) throw e;
      this._exceptionService.applicationOperationCreateRepository("Fornecedor");
    }
  }

  private async _validateUserExists(username: string, email: string) {
    const userExists = await this._userRepository.find(
      (f) => f.username == username,
    );

    if (userExists.length > 0) {
      this._logger.warn(
        "CreateUserUseCase execute",
        `user with this username (${username}) already exists`,
      );
      this._exceptionService.applicationExistingRegister(["Username"]);
    }

    const emailExists = await this._userRepository.find((f) => f.email == email);

    if (emailExists.length > 0) {
      this._logger.warn(
        "CreateUserUseCase execute",
        `user with this email (${email}) already exists`,
      );
      this._exceptionService.applicationExistingRegister(["Email"]);
    }
  }

  private async _hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
