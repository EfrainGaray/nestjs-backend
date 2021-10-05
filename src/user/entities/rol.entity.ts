import {
    Column,
    CreateDateColumn,
    Entity,

    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";



@Entity('rol')
export class Rol {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 150 , unique: true})
    name: string;
    
    @Column({ type: 'varchar', length: 255 })
    description: string;
      
    /*@ManyToMany(() => Permission)
    @JoinTable()
    permission: Permission[];*/

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

}