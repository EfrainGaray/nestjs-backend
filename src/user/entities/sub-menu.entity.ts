import {
    
    
    Column,
    CreateDateColumn,
    Entity,
    
    ManyToOne,
    
    OneToMany,
    
    PrimaryGeneratedColumn,
    UpdateDateColumn,

    
} from "typeorm";
import { Menu, RolMenuSubmenu } from ".";

@Entity('sub_menu')
export class SubMenu {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 12 })
    code: string;

    @Column({ type: 'varchar', length: 100 })
    option: string;

    @Column({ type: 'varchar', length: 255 })
    link: string;

    @Column({ type: 'int'})
    level: number;

    @OneToMany(() => RolMenuSubmenu, rolMenuSubmenu => rolMenuSubmenu.rol)
    rolMenuSubmenu: RolMenuSubmenu[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;
    
}