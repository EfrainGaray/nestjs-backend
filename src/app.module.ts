import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USERNAME } from "./config";
import { AuthModule } from './auth/auth.module';
import { PeripheralModule } from './peripheral/peripheral.module';
import { EstablishmentModule } from './establishment/establishment.module';
import { ActionModule } from './action/action.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>(DATABASE_HOST),
        port: parseInt(config.get<string>(DATABASE_PORT), 10),
        username: config.get<string>(DATABASE_USERNAME),
        password: config.get<string>(DATABASE_PASSWORD),
        database: config.get<string>(DATABASE_NAME),
        entities: [__dirname + './**/**/*entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
        logger: 'file',
      })
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    UserModule,
    AuthModule,
    PeripheralModule,
    EstablishmentModule,
    ActionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }