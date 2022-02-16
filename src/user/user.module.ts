import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Establishment } from 'src/establishment/entities';
import { EstablismentService } from 'src/establishment/services';
import { Peripheral } from 'src/peripheral/entities';
import { PeripheralService } from 'src/peripheral/services';
import { PermissionController, RolController, UserController, MenuController } from './controllers';
import { Menu,  Permission,  Rol,  RolPermissionMenu,  SubMenu, User } from './entities';
import { PermissionService, RolService, UserService, MenuService } from './services';


 
@Module({
  imports: [
        TypeOrmModule.forFeature([User, Rol, Menu, SubMenu,Permission,RolPermissionMenu, Establishment, Peripheral])
  ],
  controllers: [UserController, RolController, PermissionController, MenuController],
  providers: [UserService, RolService, PermissionService, MenuService, EstablismentService, PeripheralService],
  exports: [UserService]
})
export class UserModule {} 
