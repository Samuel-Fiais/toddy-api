import { Module } from '@nestjs/common';
import { UseCaseProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { HealthCheckController } from './health/healthCheck.controller';
import { SupplierController } from './supplier/supplier.controller';

@Module({
	imports: [UseCaseProxyModule.register()],
	controllers: [SupplierController, HealthCheckController]
})
export class ControllersModule {}