import { Module } from '@nestjs/common';
import { UseCaseProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { HealthCheckController } from './health/healthCheck.controller';
import { SupplierController } from './supplier/supplier.controller';
import { CompanyInfoController } from './company-info/company-info.controller';

@Module({
	imports: [UseCaseProxyModule.register()],
	controllers: [SupplierController, HealthCheckController, CompanyInfoController]
})
export class ControllersModule {}