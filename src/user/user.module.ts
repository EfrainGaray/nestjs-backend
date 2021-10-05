import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolController, UserController } from './controllers';
import { Menu,  Rol, RolMenuSubmenu, SubMenu, User } from './entities';
import { RolService, UserService } from './services';
 
@Module({
  imports: [
        TypeOrmModule.forFeature([User, Rol, Menu, SubMenu, RolMenuSubmenu])
  ],
  controllers: [UserController, RolController],
  providers: [UserService, RolService],
  exports: [UserService]
})
export class UserModule {} 
