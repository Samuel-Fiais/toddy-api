import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from '../models/dtos/login.dto';
import { JwtTokenService } from 'src/infra/services/jwt/jwt.service';
import { IJwtService, IJwtServicePayload } from 'src/domain/services/jwt.interface';
import { ILogger } from 'src/domain/logger/logger.interface';
import { IUserRepositoryInterface } from 'src/domain/repositories/user.repository.interface';
import { IException } from 'src/domain/exceptions/exceptions.interface';
import { IBcryptService } from 'src/domain/services/bcrypt.interface';
import * as bcrypt from 'bcrypt';
import { BcryptService } from 'src/infra/services/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _usersService: IUserRepositoryInterface,
    private readonly _jwtService: IJwtService,
    private readonly _bcryptService: IBcryptService,
    private readonly _exceptionService: IException,
  ) {}

  async execute(model: LoginDTO) {
    try {
      this._logger.log(
        'LoginUseCase execute',
        'Start to login',
      );

      const user = await this._usersService.findByUsername(model.username);
      if (!user) this._exceptionService.applicationUnauthorizedException();
      
      const areEqual = await this._bcryptService.compare(model.password, user.password);
        // const areEqual = await new BcryptService().compare(model.password, user.password)

      if (!areEqual) this._exceptionService.applicationUnauthorizedException();
      
      const payload: IJwtServicePayload = { username: user.username };
      // const token = await this._jwtService.createToken(payload);
      const token = await new JwtTokenService(new JwtService()).createToken(payload);
      console.log(token)
      return {
        access_token: token,
      };
    } catch (e) {
      this._logger.error(
        'LoginUseCase execute',
        'Error when try to login',
      );
      if (e as IException) throw e;
      this._exceptionService.applicationError(e);
    }
  }
}