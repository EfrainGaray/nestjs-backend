
import {
    
    Column,
    CreateDateColumn,
    Entity,  
    OneToMany,  
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    
} from "typeorm";
import { EnviromentParameter, Sensor } from ".";
import { Room } from "src/establishment/entities/room.entity";

@Entity('peripheral')
export class Peripheral {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 255 })
    ip: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    localization: string;
    
    @Column({ type: 'int' })
    state: number; 

    @Column({ type: 'timestamptz' })
    date_state: Date;

    @OneToMany(() => EnviromentParameter, enviromentParameter => enviromentParameter.peripheral)
    enviromentParameter: EnviromentParameter[];

    @OneToMany(() => Room, room => room.peripheral)
    room: Room[];

    @OneToMany(() => Sensor, sensor => sensor.peripheral)
    sensor: Sensor[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

}