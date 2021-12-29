
import {


    Column,
    CreateDateColumn,
    Entity,  

    ManyToOne,  

    PrimaryGeneratedColumn,
    UpdateDateColumn,
    
} from "typeorm";
import { Person } from ".";




@Entity('alarm-state')
export class AlarmState {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255})
    value: string;

    @Column({ type: 'varchar' , length: 50})
    date: Date;

    @ManyToOne(() => Person, person => person.alarmState)
    person: Person;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

}