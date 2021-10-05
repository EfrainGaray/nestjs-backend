import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Menu, Rol } from ".";




@Entity('permission')
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 12 , unique: true})
    code: string;

    @Column({ type: 'varchar', length: 20 })
    type: string;

    @Column({ type: 'int' })
    state: number;


 
    @OneToMany(() => Menu, menu => menu.permission)
    menu: Menu[];


    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

}