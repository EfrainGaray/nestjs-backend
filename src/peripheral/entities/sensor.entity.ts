
import {

    Column,
    CreateDateColumn,
    Entity,  

    ManyToOne,  

    PrimaryGeneratedColumn,
    UpdateDateColumn,
    
} from "typeorm";
import { Peripheral } from ".";


@Entity('sensor')
export class Sensor {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 150 })
    name: string;

    @ManyToOne(() => Peripheral, peripheral => peripheral.sensor)
    peripheral: Peripheral;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

}