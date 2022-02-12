
import {

    Column,
    CreateDateColumn,
    Entity,  

    ManyToOne,  

    PrimaryGeneratedColumn,
    UpdateDateColumn,
    
} from "typeorm";
import { Session } from "./session.entity";



@Entity('parameter')
export class Parameter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    persons_with_mask: number;

    @Column({ type: 'int' })
    people_infected: number;

    @Column({ type: 'double precision' })
    exhalation_rate: number;

    @Column({ type: 'double precision' })
    respiratory_rate: number;

    @Column({ type: 'double precision' })
    CO2_emission: number;

    @Column({ type: 'double precision' })
    inhalation_efficiency: number;

    @Column({ type: 'double precision' })
    exhalation_efficiency: number;

    @Column({ type: 'int' })
    additional_measures: number;

    @ManyToOne(() => Session, session => session.parameter)
    session: Session;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

}