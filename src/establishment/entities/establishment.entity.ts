import {

    Column,
    Entity,  

    PrimaryGeneratedColumn,
    
} from "typeorm";


@Entity('establishment')
export class Establishment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 150 })
    name: string;

}