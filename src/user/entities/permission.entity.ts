import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Menu } from ".";

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
 
  
    @ManyToMany(() => Menu)
    @JoinTable()
    menu: Menu[]; 


    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

}