import {
    
    Column,
    CreateDateColumn,
    Entity,
    
    ManyToOne,
    
    OneToMany,
    
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    
} from "typeorm";
import { Permission, SubMenu } from ".";





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
    @ManyToOne(() => Permission, permission => permission.menu)
    permission: Permission;

    @OneToMany(() => SubMenu, subMenu => subMenu.menu)
    subMenu: SubMenu[];
 
    
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;
}