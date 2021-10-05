import {

    Column,
    CreateDateColumn,
    Entity,  


    ManyToOne,  


    PrimaryGeneratedColumn,
    UpdateDateColumn,
    
} from "typeorm";
import { Establishment } from ".";


@Entity('contact')
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 150 })
    name: string;

    @Column({ type: 'varchar', length: 150 })
    primaryLastName: string;

    @Column({ type: 'varchar', length: 150 })
    secondLastName: string;
   
    @Column({ type: 'varchar', length: 150 })
    position: string;

    @Column({ type: 'varchar', length: 150,unique: true })
    email: string;

    @ManyToOne(() => Establishment, establishment => establishment.contact)
    establishment: Establishment;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

}