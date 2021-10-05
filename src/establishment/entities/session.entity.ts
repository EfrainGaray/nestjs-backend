
import {

    Column,
    CreateDateColumn,
    Entity,  

    ManyToOne,  

    OneToMany,  

    PrimaryGeneratedColumn,
    UpdateDateColumn,
    
} from "typeorm";
import { Parameter, Room } from ".";

@Entity('session')
export class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamptz' })
    date: Date;

    @Column({ type: 'int' })
    duration: number;

    @Column({ type: 'float' })
    background_CO2: number; 

    @Column({ type: 'int' })
    exterior_ventilation: number;

    @Column({ type: 'int' })
    event_repeats: number;

    @ManyToOne(() => Room, room => room.session)
    room: Room;

    @OneToMany(() => Parameter, parameter => parameter.session)
    parameter: Parameter[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;
}