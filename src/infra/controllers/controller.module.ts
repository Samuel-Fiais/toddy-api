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

@Module({
  imports: [
    UseCaseProxySupplierModule.register(),
    UseCaseProxyCompanyInfoModule.register(),
    UseCaseProxyAuthModule.register(),
    UseCaseProxyUserModule.register(),
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
