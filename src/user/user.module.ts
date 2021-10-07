import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionController, RolController, UserController, MenuController } from './controllers';
import { Menu,  Permission,  Rol,  SubMenu, User } from './entities';
import { PermissionService, RolService, UserService, MenuService } from './services';


 
@Module({
  imports: [
        TypeOrmModule.forFeature([User, Rol, Menu, SubMenu,Permission])
  ],
  controllers: [UserController, RolController, PermissionController, MenuController],
  providers: [UserService, RolService, PermissionService, MenuService],
  exports: [UserService]
})
export class UserModule {} 
