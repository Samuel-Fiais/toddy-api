import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ResponseInterceptor } from './infra/common/interceptors/response.interceptor'
import { AllExceptionFilter } from './infra/common/filter/exception.filter'
import { LoggerService } from './infra/logger/logger.service'
import { PrismaService } from './infra/database/prisma.service'
import * as cors from 'cors'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Toddy API')
    .setDescription('Toddy API description')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  // Interceptor
  app.useGlobalInterceptors(new ResponseInterceptor())

  // Filter
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()))

  // PrismaService
  const prismaService = app.get(PrismaService)
  await prismaService.$connect()

  app.use(cors())

  await app.listen(process.env.PORT || 3000)
}
bootstrap()
