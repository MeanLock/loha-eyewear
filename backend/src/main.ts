import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cấu hình Global API Prefix
  app.setGlobalPrefix('api/v1');

  // Bật CORS cho FE
  app.enableCors();

  // Bật ValidationPipe để check DTOs (Tự động xoá những trường không khai báo)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // Tự động convert string queries -> number, boolean
    }),
  );

  // Bọc API Response bằng Envelope Object { statusCode, message, data, meta }
  app.useGlobalInterceptors(new TransformInterceptor());

  // Format cấu trúc Error Response thống nhất
  app.useGlobalFilters(new AllExceptionsFilter());

  // Setup Swagger Documentation (OpenAPI)
  const config = new DocumentBuilder()
    .setTitle('LoHa Eyewear API')
    .setDescription('Tài liệu API cho Front-End Developer Team')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT-auth', // Tên tham chiếu
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}/api/v1`);
  console.log(`📃 Swagger Documentation available at: http://localhost:${port}/api-docs`);
}
bootstrap();
