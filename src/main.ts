import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors: true});

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,   // удаляет лишние поля из dto
      forbidNonWhitelisted: false, // можно true, тогда будет кидать ошибку если есть лишние поля
      transform: true,   // <-- вот это важно, чтобы query/body приводились к типам
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('My API')                 // Заголовок документации
    .setDescription('API description')  // Описание
    .setVersion('1.0')                  // Версия
    .addBearerAuth()                    // Добавим JWT авторизацию (если нужно)
    .build();

  const document = SwaggerModule.createDocument(app, config);
     app.use(
      '/docs',
      apiReference({
        content: document,
        theme: 'deepSpace',
        layout: 'modern',
        defaultHttpClient: {
          targetKey: 'node',
          clientKey: 'axios',
        },
        persistAuth: true,
        authentication: {
          preferredSecurityScheme: 'token',
          securitySchemes: {
            token: {
              
            },
          },
        },
      }),
    );

  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
