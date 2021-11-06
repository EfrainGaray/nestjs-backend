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
import { Permission} from ".";
import { RolPermissionMenu } from "./rol-permission-menu.entity";



@Entity('rol')
export class Rol {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 15 , unique: true})
    name: string;
    
    @Column({ type: 'varchar', length: 255 })
    description: string;


    /*
    @ManyToMany(() => Permission)
    @JoinTable()
    permission: Permission[]; 
    */
    @OneToMany(() => RolPermissionMenu, rolPermissionMenu => rolPermissionMenu.rol)
    rolPermissionMenu: RolPermissionMenu;

          
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

}