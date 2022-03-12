import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {hash} from "bcrypt";
import { Rol } from ".";
import { Establishment } from "src/establishment/entities";
import { Peripheral } from "src/peripheral/entities";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 150,unique: true })
    email: string;

    @Column({ type: 'varchar', length: 150 })
    name: string;

    @Column({ type: 'text', select: false })
    password: string;
 
    @Column({ type: 'varchar', length: 150 })
    primaryLastName: string;

    @Column({ type: 'varchar', length: 150, nullable: true})
    secondLastName: string;

    @Column({ type: 'varchar', length: 15, unique: true })
    rut: string;


    @Column({ type: 'varchar', length: 255,default: null})
    avatar: string;

    @Column({ type: 'int' , default: 1})
    state: number;

  
    @ManyToMany(() => Establishment)
    @JoinTable()
    establishment?: Establishment[];


    @ManyToMany(() => Rol)
    @JoinTable()
    rol?: Rol[];

    @ManyToMany(() => Peripheral)
    @JoinTable()
    peripheral?: Peripheral[];


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