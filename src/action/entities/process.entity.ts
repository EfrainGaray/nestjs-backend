

import {

    Column,
    CreateDateColumn,
    Entity,  
 
    ManyToOne,  
 
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    
} from "typeorm";

import { EnviromentParameter } from "src/peripheral/entities";
import { MitigatingAction } from ".";

@Entity('process')
export class Process {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 15, unique: true })
    rut_person: string;

    @Column({ type: 'int' })
    type: number;

    @Column({ type: 'varchar', length: 255})
    steps: string;

    @ManyToOne(() => EnviromentParameter, enviromentParameter => enviromentParameter.process)
    enviromentParameter: EnviromentParameter;

    @ManyToOne(() => MitigatingAction, mitigatingAction => mitigatingAction.process)
    mitigatingAction: MitigatingAction;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;


}