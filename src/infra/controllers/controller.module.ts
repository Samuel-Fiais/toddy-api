import { Module } from "@nestjs/common";
import { UseCaseProxySupplierModule } from "../usecases-proxy/usecases-proxy.supplier.module";
import { HealthCheckController } from "./health/health-check.controller";
import { SupplierController } from "./supplier/supplier.controller";
import { CompanyInfoController } from "./company-info/company-info.controller";
import { UseCaseProxyCompanyInfoModule } from "../usecases-proxy/usecases-proxy.company-info.module";
import { AuthController } from "./auth/auth.controller";
import { UseCaseProxyAuthModule } from "../usecases-proxy/usecases-proxy.auth.module";
import { UseCaseProxyUserModule } from "../usecases-proxy/usecases-proxy.user.module";
import { UserController } from "./user/user.controller";
import { JwtModule } from "@nestjs/jwt";
import { GuardsModule } from "../common/guards/guard.module";

@Module({
  imports: [
    UseCaseProxySupplierModule.register(),
    UseCaseProxyCompanyInfoModule.register(),
    UseCaseProxyAuthModule.register(),
    UseCaseProxyUserModule.register(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1h" },
    }),
    GuardsModule,
  ],
  controllers: [
    SupplierController,
    HealthCheckController,
    CompanyInfoController,
    AuthController,
    UserController,
  ],
})
export class ControllersModule {}
