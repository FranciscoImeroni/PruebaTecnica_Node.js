import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*',
  });

  const options = new DocumentBuilder()
    .setTitle('API de Proyectos')
    .setDescription('API para gestionar proyectos, tareas y usuarios')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  const swaggerUIPath = require('swagger-ui-dist').getAbsoluteFSPath();
  app.use('/swagger-static', express.static(swaggerUIPath));

  SwaggerModule.setup('api-docs', app, document, {
    customCssUrl: '/swagger-static/swagger-ui.css',
    customJs: '/swagger-static/swagger-ui-bundle.js',
    customfavIcon: '/swagger-static/favicon-32x32.png',
    swaggerOptions: {
      url: '/api-docs-json',
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
