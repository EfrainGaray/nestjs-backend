
import {
    
    Column,
    Entity,  
    ManyToOne,   
    PrimaryGeneratedColumn,
    
} from "typeorm";

import { Peripheral } from "src/peripheral/entities";

@Entity('room')
export class Room {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 150 })
    name: string;

    @Column({ type: 'int' })
    capacity: number;

    @Column({ type: 'float' })
    height: number; 

    @Column({ type: 'float' })
    width: number; 

    @Column({ type: 'float' })
    length: number; 

    @ManyToOne(() => Peripheral, peripheral => peripheral.room)
   peripheral: Peripheral;
}