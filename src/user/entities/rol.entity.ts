import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,

    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Menu, RolMenuSubmenu } from ".";



@Entity('rol')
export class Rol {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 150 , unique: true})
    name: string;
    
    @Column({ type: 'varchar', length: 255 })
    description: string;
      
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

    @ManyToMany(() => Permission)
    @JoinTable()
    permission: Permission[]; 

}