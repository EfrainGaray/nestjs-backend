import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    
} from "typeorm";
import { Menu, Permission, Rol } from ".";


@Entity('rol_permission_menu')
export class RolPermissionMenu {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    rolId: number;

    @Column()
    permissionId: number;

    @Column()
    menuId: number;

    @ManyToOne(() => Rol, rol => rol.rolPermissionMenu)
    rol: Rol[];

    @ManyToOne(() => Permission,permission => permission.rolPermissionMenu)
    permission: Permission[];

    @ManyToOne(() => Menu,menu => menu.rolPermissionMenu)
    menu: Menu[];

    
}