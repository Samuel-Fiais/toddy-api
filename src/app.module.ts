import { Module } from "@nestjs/common";
import { PrismaService } from "./infra/database/prisma.service";
import { ControllersModule } from "./infra/controllers/controller.module";
import { RepositoriesModule } from "./infra/repositories/repositories.module";
import { BcryptModule } from "./infra/services/bcrypt/bcrypt.module";
// import { UseCaseProxyAuthModule } from "./infra/usecases-proxy/usecases-proxy.auth.module";
import { UseCaseProxyCompanyInfoModule } from "./infra/usecases-proxy/usecases-proxy.company-info.module";
import { UseCaseProxySupplierModule } from "./infra/usecases-proxy/usecases-proxy.supplier.module";
import { UseCaseProxyUserModule } from "./infra/usecases-proxy/usecases-proxy.user.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers: [PrismaService],
  imports: [
    ControllersModule,
    RepositoriesModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    BcryptModule,

    // UseCaseProxyAuthModule.register(),
    UseCaseProxyCompanyInfoModule.register(),
    UseCaseProxySupplierModule.register(),
    UseCaseProxyUserModule.register(),
  ],
})
export class AppModule {}
