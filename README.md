
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Api (NestJS) - Swagger 
        <p align="center">

<a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" />
</a>
<a href="#badge">
    <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
</a>
<a href="https://paypal.me/hea717" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
</p>


<h1 align="center" style="border-bottom: none;">Api example</h1>

##Installation
```zsh
git clone https://github.com/LuftBioMonitor/nestjs-api-landingpage-main.git
cd nestjs-backend
yarn
```

##Configure env

app.module.ts
```javascript
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import {DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USERNAME} from "./config";
import { AuthModule } from './auth/auth.module';
import {AccessControlModule} from "nest-access-control";
import {roles} from "./app.roles";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres', //change to your database ex: mysql
        host: config.get<string>(DATABASE_HOST),
        port: parseInt(config.get<string>(DATABASE_PORT), 10),
        username: config.get<string>(DATABASE_USERNAME),
        password: config.get<string>(DATABASE_PASSWORD),
        database: config.get<string>(DATABASE_NAME),
        entities: [__dirname + './**/**/*entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: false,
        logging: false,
        logger: 'file',
      })
    }),
    AccessControlModule.forRoles(roles),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```


```zsh
$ cp .env.sample .env
$ vim .env

DATABASE_HOST =  SqlHost
DATABASE_PORT = SqlPort
DATABASE_USERNAME = SqlUserName
DATABASE_PASSWORD = SqlPasssword
DATABASE_NAME = SqlDataBase
JWT_SECRET = mystringsecret
DEFAULT_USER_EMAIL = USER_ADMIN
DEFAULT_USER_PASSWORD =  PASSSWORD_ADMIN

```
#Testing docker
```zsh
docker build -t nestjs-backend .
docker run --rm -it --env-file=.env -p 80:3000 nestjs-backend
```
