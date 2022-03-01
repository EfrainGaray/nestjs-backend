import {

    Column,
    CreateDateColumn,
    Entity,

    ManyToOne,

    PrimaryGeneratedColumn,
    UpdateDateColumn,

    
} from "typeorm";
import { EnviromentParameter } from ".";




@Entity('bioepidermiological_parameters')
export class BioepidermiologicalParameters {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'double precision'})
    infection_posibility: number; 

    @Column({ type: 'double precision' })
    hospitalization_rate: number; 

    @Column({ type: 'double precision' })
    death_rate: number; 

    @Column({ type: 'integer' })
    porcentage_immunized_population: number; 

    @Column({ type: 'double precision' })
    decay_rate: number; 

    @Column({ type: 'double precision' })
    deposition_surficies: number; 

    @ManyToOne(() => EnviromentParameter, enviromentParameter => enviromentParameter.bioepidermiologicalParameters)
    enviromentParameter: EnviromentParameter;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;
  
}