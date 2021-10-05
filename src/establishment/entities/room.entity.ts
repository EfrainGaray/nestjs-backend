
import {
    
    Column,
    CreateDateColumn,
    Entity,  
    ManyToOne,   
    OneToMany,   
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    
} from "typeorm";

import { Peripheral } from "src/peripheral/entities";
import { Person } from "src/action/entities";
import { Session } from "./session.entity";


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

   @OneToMany(() => Person, person => person.room)
   person: Person[];

   @OneToMany(() => Session, session => session.room)
   session: Session[];

   @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;
}