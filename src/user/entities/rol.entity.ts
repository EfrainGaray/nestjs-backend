import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,

    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import {  Permission } from ".";



@Entity('rol')
export class Rol {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 150 , unique: true})
    name: string;
    
    @Column({ type: 'varchar', length: 255 })
    description: string;
      

    @ManyToOne(() => Permission, permission => permission.rol)
    permission: Permission;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

}