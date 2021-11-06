import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger, ValidationPipe} from "@nestjs/common";
import {initSwagger} from "./app.swagger";

import {setDefaultUser} from "./config/default-user";
import {ConfigService} from "@nestjs/config";
import {SERVER_PORT} from "./config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Bootstrap');
  const config = app.get(ConfigService);
  const port = parseInt(config.get<string>(SERVER_PORT), 10) || 3001;
  setDefaultUser(config);

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
  );


  app.setGlobalPrefix('api');
  //initSwagger(app);

  await app.listen(port);
  logger.log(`Server is running at ${await app.getUrl()}`);
}
bootstrap();
