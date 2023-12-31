import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { LoggerService } from "../logger/logger.service";
import { BaseRepository } from "./base.repository";
import { IUserRepository } from "src/domain/repositories/user.repository.interface";
import { User } from "src/domain/entities/user.entity";
import { ExceptionService } from '../exceptions/exception.service';

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly logger: LoggerService,
    protected readonly exceptionService: ExceptionService,
  ) {
    super(prisma, "User", logger, exceptionService);
  }
}
