import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const initSwagger = (app: INestApplication) => {
    const swaggerConfig = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('NestJs Example api')
        .setDescription('Documentacion api con swagger nestjs')
        .setVersion('1.0.0')
        .addTag('NestJs - Backend')

        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/docs', app, document);
};