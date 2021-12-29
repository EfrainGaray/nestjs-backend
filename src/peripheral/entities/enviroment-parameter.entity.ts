    import { Process } from "src/action/entities";
    import {
        Column,
        CreateDateColumn,
        Double,
        Entity,

        ManyToOne,

        OneToMany,

        PrimaryGeneratedColumn,
        UpdateDateColumn,

        
    } from "typeorm";
    import { BioepidermiologicalParameters, Peripheral } from ".";



    @Entity('enviroment_parameter')
    export class EnviromentParameter {
        @PrimaryGeneratedColumn()
        id: number;
        
        @Column({ type: 'varchar', length: 20 })
        date_time: Date;

        @Column({ type: 'float' })
        relative_humidity: Double; 

        @Column({ type: 'float' })
        temperature: Double; 

        @Column({ type: 'float' })
        pressure: Double; 
        
        @Column({ type: 'float' })
        CO2: Double; 

        @Column({ type: 'varchar', length: 100 })
        CO2_alarm: string; 

        @Column({ type: 'float' })
        algorithm_result: Double; 

        @Column({ type: 'int' })
        SGP40_voc_index: Double; 

        @Column({ type: 'float' })
        SGP40_emp: Double; 

        @Column({ type: 'varchar' })
        SGP40_hr: string; 

        @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
        createdAt: Date;

        @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
        updatedAt: Date;

    @ManyToOne(() => Peripheral, peripheral => peripheral.enviromentParameter)
    peripheral: Peripheral;

    @OneToMany(() => BioepidermiologicalParameters, bioepidermiologicalParameters => bioepidermiologicalParameters.enviromentParameter)
    bioepidermiologicalParameters: BioepidermiologicalParameters[];

    @OneToMany(() => Process, process => process.enviromentParameter)
    process: Process[];

    

    }