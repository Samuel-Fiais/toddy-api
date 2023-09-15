import { Module } from '@nestjs/common'
import { PrismaService } from './infra/database/prisma.service'
import { ControllersModule } from './infra/controllers/controller.module'
import { RepositoriesModule } from './infra/repositories/repositories.module'

@Module({
  providers: [PrismaService],
  imports: [ControllersModule, RepositoriesModule],
})
export class AppModule {}
