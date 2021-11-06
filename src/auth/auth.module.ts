import { Module } from '@nestjs/common';
import { PassportModule } from "@nestjs/passport";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from "../user/user.module";
import { LocalStrategy,JwtStrategy } from "./strategies";
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {JWT_SECRET} from "../config";

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>(JWT_SECRET),
        signOptions: { expiresIn: '5m' },
      }),
    }),
    UserModule,
  ],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
