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
import {  SubMenu } from ".";
import { RolPermissionMenu } from "./rol-permission-menu.entity";

@Entity('menu')
export class Menu {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 12 })
    code: string;

    @Column({ type: 'varchar', length: 100 })
    option: string;

    @Column({ type: 'varchar', length: 255 })
    link: string;
    
    @OneToMany(() => RolPermissionMenu, rolPermissionMenu => rolPermissionMenu.menu)
    rolPermissionMenu: RolPermissionMenu;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;
}