import {
    Column,
    CreateDateColumn,
    Entity,

    ManyToOne,

    PrimaryGeneratedColumn,
    UpdateDateColumn,

    
} from "typeorm";
import { Peripheral } from ".";



@Entity('enviroment_paremeter')
export class EnviromentParameter {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'timestamptz' })
    date_time: Date;

    @Column({ type: 'float' })
    relative_humidity: number; 

    @Column({ type: 'float' })
    temperature: number; 

    @Column({ type: 'float' })
    pressure: number; 
    
    @Column({ type: 'float' })
    CO2: number; 

    @Column({ type: 'varchar', length: 100 })
    CO2_alarm: string; 

    @Column({ type: 'float' })
    algorithm_result: number; 

    @Column({ type: 'int' })
    SGP40_voc_index: number; 

    @Column({ type: 'float' })
    SGP40_emp: number; 

    @Column({ type: 'varchar', length: 50 })
    SGP40_hr: string; 

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

   @ManyToOne(() => Peripheral, peripheral => peripheral.enviromentParameter)
   peripheral: Peripheral;

}