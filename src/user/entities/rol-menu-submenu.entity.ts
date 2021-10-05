import {
    
    Column,
    CreateDateColumn,
    Entity,
    

    
    ManyToOne,
    

    
    OneToMany,
    
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    
} from "typeorm";
import { Menu, Rol, SubMenu } from ".";





@Entity('rol_menu_submenu')
export class RolMenuSubmenu {

    @PrimaryGeneratedColumn()
    id: number;
        

    @ManyToOne(() => Rol, rol => rol.rolMenuSubmenu)
    rol: Rol;

    
    @ManyToOne(() => Menu, menu => menu.rolMenuSubmenu)
    menu: Menu;

    @ManyToOne(() => SubMenu, subMenu => subMenu.rolMenuSubmenu)
    subMenu: SubMenu;
}