import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from './user.service';
import { Menu, Permission, Rol, SubMenu, User } from './entities';

@Module({
  imports: [
        TypeOrmModule.forFeature([User, Rol, Permission, Menu, SubMenu])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {} 
