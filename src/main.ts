import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './infra/common/interceptors/response.interceptor';
import { AllExceptionFilter } from './infra/common/filter/exception.filter';
import { LoggerService } from './infra/logger/logger.service';
import { PrismaService } from './infra/database/prisma.service';
import * as cors from 'cors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Filter
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  // PrismaService
  const prismaService = app.get(PrismaService);
  await prismaService.$connect();

  app.use(cors());

  await app.listen(3000);
}
bootstrap();
