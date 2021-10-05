
import { Room } from "src/establishment/entities";
import {


    Column,
    CreateDateColumn,
    Entity,  
 

 
    ManyToOne,  
 

 
    OneToMany,  
 

 
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    
} from "typeorm";
import { AlarmaState, MitigatingAction } from ".";



@Entity('person')
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 150 })
    name: string;

    @Column({ type: 'varchar', length: 150 })
    primaryLastName: string;

    @Column({ type: 'varchar', length: 150 })
    secondLastName: string;

    @Column({ type: 'varchar', length: 15, unique: true })
    rut: string;

    @Column({ type: 'varchar', length: 150,unique: true })
    email: string;

    @ManyToOne(() => Room, room => room.person)
    room: Room;

    @OneToMany(() => MitigatingAction, mitigatingAction => mitigatingAction.person)
    mitigatingAction: MitigatingAction[];

    @OneToMany(() => AlarmaState, alarmState => alarmState.person)
    alarmState: AlarmaState[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

}