
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

    @Column({ type: 'int' })
    exhalation_rate: number;

    @Column({ type: 'int' })
    respiratory_rate: number;

    @Column({ type: 'int' })
    CO2_emission: number;

    @Column({ type: 'int' })
    inhalation_efficiency: number;

    @Column({ type: 'int' })
    exhalation_efficiency: number;

    @Column({ type: 'varchar', length: 255 })
    additional_measures: string;

    @ManyToOne(() => Session, session => session.parameter)
    session: Session;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

}