import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {initSwagger} from "./app.swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
  );
  app.setGlobalPrefix('api');
  initSwagger(app);

  await app.listen(3000);
}
bootstrap();
