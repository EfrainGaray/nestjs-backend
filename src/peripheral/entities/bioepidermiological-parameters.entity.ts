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
    
    @Column({ type: 'float' })
    infection_posibility: number; 

    @Column({ type: 'float' })
    hospitalization_rate: number; 

    @Column({ type: 'float' })
    death_rate: number; 

    @Column({ type: 'int' })
    porcentage_immunized_population: number; 

    @Column({ type: 'float' })
    decay_rate: number; 

    @Column({ type: 'float' })
    deposition_surficies: number; 

    @ManyToOne(() => EnviromentParameter, enviromentParameter => enviromentParameter.bioepidermiologicalParameters)
    enviromentParameter: EnviromentParameter;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;
  
}