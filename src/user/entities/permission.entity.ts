import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Menu } from ".";
import { RolPermissionMenu } from "./rol-permission-menu.entity";

@Entity('permission')
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 12 , unique: true})
    code: string;

    @Column({ type: 'varchar', length: 20 })
    type: string;

    @Column({ type: 'int' , default: 1})
    state: number;
 
  /*
    @ManyToMany(() => Menu)
    @JoinTable()
    menu: Menu[]; 
*/


    @OneToMany(() => RolPermissionMenu, rolPermissionMenu => rolPermissionMenu.permission)
    rolPermissionMenu: RolPermissionMenu;


    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

}