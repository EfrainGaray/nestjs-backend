
import {
    
    Column,
    Entity,  
    OneToMany,  
    PrimaryGeneratedColumn,
    
} from "typeorm";
import { EnviromentParameter } from ".";
import { Room } from "src/establishment/entities";

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

}