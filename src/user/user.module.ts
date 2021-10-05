import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolController, UserController } from './controllers';
import { Menu, Permission, Rol, SubMenu, User } from './entities';
import { RolService, UserService } from './services';
 
@Module({
  imports: [
        TypeOrmModule.forFeature([User, Rol, Permission, Menu, SubMenu])
  ],
  controllers: [UserController, RolController],
  providers: [UserService, RolService],
  exports: [UserService]
})
export class UserModule {} 
