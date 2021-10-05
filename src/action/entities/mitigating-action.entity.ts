

import {

    Column,
    CreateDateColumn,
    Entity,  

    ManyToOne,  

    OneToMany,  

    PrimaryGeneratedColumn,
    UpdateDateColumn,
    
} from "typeorm";
import { Person, Process } from ".";



@Entity('mitigating_action')
export class MitigatingAction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 150 })
    name: string;

    @Column({ type: 'varchar', length: 100 })
    type: string;

    @ManyToOne(() => Person, person => person.mitigatingAction)
    person: Person;

    @OneToMany(() => Process, process => process.mitigatingAction)
    process: Process[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

}