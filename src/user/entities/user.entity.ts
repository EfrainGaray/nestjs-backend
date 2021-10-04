import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {hash} from "bcrypt";
import { Rol } from ".";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 150 })
    email: string;

    @Column({ type: 'varchar', length: 150 })
    name: string;

    @Column({ type: 'varchar', length: 10, select: false })
    password: string;

    @Column({ type: 'varchar', length: 150 })
    primaryLastName: string;

    @Column({ type: 'varchar', length: 150 })
    secondLastName: string;

    @Column({ type: 'varchar', length: 15 })
    rut: string;

    @Column({ type: 'varchar', length: 50 })
    category: string;
    
    @Column({ type: 'int' })
    state: number;


    //todo : Crear relación 
    @Column({ type: 'int' })
    idEstablishment: number;
    // end todo

    @ManyToMany(() => Rol)
    @JoinTable()
    rol: Rol[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (!this.password) {
            return;
        }
        this.password = await hash(this.password, 10);
    }
}