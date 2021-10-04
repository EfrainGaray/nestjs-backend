import {
    
    Column,
    Entity,  
    PrimaryGeneratedColumn,
    
} from "typeorm";

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



}