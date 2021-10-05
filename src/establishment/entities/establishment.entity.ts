
import {

    Column,
    CreateDateColumn,
    Entity,  

    OneToMany,  

    PrimaryGeneratedColumn,
    UpdateDateColumn,
    
} from "typeorm";

import { User } from "src/user/entities";
import { Contact } from ".";

@Entity('establishment') 
export class Establishment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 150 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    address: string;

    @Column({ type: 'varchar', length: 150 })
    category: string;

    @Column({ type: 'varchar', length: 255, unique: true  })
    business_name: string;

    @Column({ type: 'varchar', length: 15, unique: true })
    rut: string;

    @Column({ type: 'float' })
    latitude: number; 

    @Column({ type: 'float' })
    longitude: number; 

    @OneToMany(() => User, user => user.establishment)
    user: User[];

    @OneToMany(() => Contact, contact => contact.establishment)
    contact: Contact[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

}