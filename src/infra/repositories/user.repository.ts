import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { LoggerService } from "../logger/logger.service";
import { BaseRepository } from "./base.repository";
import { IUserRepositoryInterface } from "src/domain/repositories/user.repository.interface";
import { User } from "src/domain/entities/user.entity";

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepositoryInterface
{
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly logger: LoggerService,
  ) {
    super(prisma, "User", logger);
  }

  async findByUsername(username: string): Promise<User> {
    try {
      return await this.prisma.user.findFirst({
        where: {
          username,
        },
        include: {
          permissions: true,
        },
      });
    } catch (e) {
      this.logger.error(
        `UserRepository findByUsername`,
        `Error to find a user by username`,
        e,
      );
    }
  }
}
