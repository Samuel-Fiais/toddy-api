import { Injectable } from "@nestjs/common";
import { LoginDTO } from "../models/dtos/login.dto";
import {
  IJwtService,
  IJwtServicePayload,
} from "src/domain/services/jwt.interface";
import { ILogger } from "src/domain/logger/logger.interface";
import { IUserRepository } from "src/domain/repositories/user.repository.interface";
import { IException } from "src/domain/exceptions/exceptions.interface";
import { IBcryptService } from "src/domain/services/bcrypt.interface";
import { User } from "src/domain/entities/user.entity";

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _usersService: IUserRepository,
    private readonly _exceptionService: IException,
    private readonly _jwtService: IJwtService,
    private readonly _bcryptService: IBcryptService,
  ) {}

  // token_expires_in = parseInt(process.env.JWT_EXPIRES_IN_NUMBER) || 3600;

  async execute(model: LoginDTO) {
    try {
      this._logger.log("LoginUseCase execute", "Start to login");

      const user = await this._usersService.find(
        (u) => u.username === model.username,
        {
          permissions: true,
        }
      ).then((u) => u[0]);
      if (!user) this._exceptionService.applicationUnauthorizedException();

      const areEqual = await this._bcryptService.compare(
        model.password,
        user.password,
      );
      if (!areEqual) this._exceptionService.applicationUnauthorizedException();

      const payload = this.createPayload(user);
      const token = this._jwtService.createToken(payload);

      return {
        access_token: token,
      };
    } catch (e) {
      this._logger.error("LoginUseCase execute", "Error when try to login");
      if (e as IException) throw e;
      this._exceptionService.applicationError(e);
    }
  }

  private createPayload(user: User): IJwtServicePayload {
    return {
      userId: user.id || "",
      username: user.username || "",
      email: user.email || "",
      permissions: user.permissions.map((p) => p.description),
      // dateExpire = 1h
      dateExpire: new Date(Date.now() + 3600 * 1000),
    };
  }
}
