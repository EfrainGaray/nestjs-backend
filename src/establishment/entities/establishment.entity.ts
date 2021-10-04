import { User } from "src/user/entities";
import {

    Column,
    Entity,  

    OneToMany,  

    PrimaryGeneratedColumn,
    
} from "typeorm";


@Entity('establishment')
export class Establishment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 150 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    address: string;

    @Column({ type: 'varchar', length: 150 })
    category: string;

    @Column({ type: 'varchar', length: 255, unique: true  })
    business_name: string;

    @Column({ type: 'varchar', length: 15, unique: true })
    rut: string;

    @Column({ type: 'float' })
    latitude: number; 

    @Column({ type: 'float' })
    longitude: number; 

    @OneToMany(() => User, user => user.establishment)
    user: User[];

}