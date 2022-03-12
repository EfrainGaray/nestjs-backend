
import { Peripheral } from "src/peripheral/entities";
import {

    Column,
    CreateDateColumn,
    Double,
    Entity,  

    OneToMany,  

    PrimaryGeneratedColumn,
    UpdateDateColumn,
    
} from "typeorm";

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

    @Column({ type: 'varchar', length: 255, unique: true })
    business_name: string;

    @Column({ type: 'varchar', length: 15, unique: true })
    rut: string;

    @Column({ type: 'float' })
    latitude: Double; 

    @Column({ type: 'float' })
    longitude: Double; 

   

    @OneToMany(() => Contact, contact => contact.establishment)
    contact: Contact[];

    @OneToMany(() => Peripheral, peripheral => peripheral.establishment)
    peripheral: Peripheral[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

}