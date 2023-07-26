import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './infra/common/interceptors/response.interceptor';
import { AllExceptionFilter } from './infra/common/filter/exception.filter';
import { LoggerService } from './infra/logger/logger.service';
import { PrismaService } from './infra/database/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Filter
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  // PrismaService
  const prismaService = app.get(PrismaService);
  await prismaService.$connect();

  await app.listen(process.env.PORT);
}
bootstrap();
