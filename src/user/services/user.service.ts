import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { EstablismentService } from 'src/establishment/services';
import { PeripheralService } from 'src/peripheral/services';

import {Repository} from "typeorm";
import { RolService } from '.';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import {  User } from '../entities';


export interface UserFindEmail {
    id?: number;
    email?: string;
}


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        public rolServices: RolService,
        public establishmentServices: EstablismentService,
        public peripheralServices: PeripheralService
    ) {}
    
    async all(): Promise<User[]> {
        const  users = await this.userRepository.find({ relations:['rol'] })
        return users;
    }
    
    async create(dto: CreateUserDto): Promise<User> {
        const userExist = await this.userRepository.findOne({ email: dto.email });
        if (userExist) throw new BadRequestException('User already registered with email');
        if(dto.rol){
            const rol = await this.rolServices.getForCode(dto.rol);
            if (!rol) throw new BadRequestException('Rol not created');
        }

        if(!dto.rutEstablishment){
            const rutEstablishment = await this.establishmentServices.getForRut(dto.rutEstablishment);
            if (!rutEstablishment) throw new BadRequestException('Establishment does not exists');
        }
        
       if(!dto.namePeripheral){
            var namePeripheral = await this.peripheralServices.getForName(dto.namePeripheral);
            if (!namePeripheral) throw new BadRequestException('Peripheral does not exists');
        }
        
        const newUser = this.userRepository.create(
            {
                name:dto.name,
                password:dto.password,
                email:dto.email,
                primaryLastName:dto.primaryLastName,
                secondLastName:dto.secondLastName,
                rut:dto.rut,
                rol: [await this.rolServices.getForCode(dto.rol)],
                establishment : [await this.establishmentServices.getForRut(dto.rutEstablishment)],
                peripheral : [await this.peripheralServices.getForName(dto.namePeripheral)]
        })
        const  user = await this.userRepository.save(newUser)

        delete user.password;
        return this.get(user.id);
    }
    async get(id: number): Promise<User>{
        const user = await this.userRepository.findOne(id,{relations: ['rol', 'establishment', 'peripheral']});
        if (!user) throw new NotFoundException('User does not exists')
        
        delete user.password;

        return  user;
    }
    async update(id,dto: UpdateUserDto): Promise<User>{
        const user = await this.get(id)
        if(dto.rol){
            const rol = await this.rolServices.getForCode(dto.rol);
            if (!rol) throw new BadRequestException('Rol not created');
        }
           
        const editedUser = Object.assign(user, dto);
        delete editedUser.rol;
        console.log(editedUser);
        await this.userRepository.save({
            id:editedUser.id,
            name:editedUser.name,
            password:editedUser.password,
            email:editedUser.email,
            primaryLastName:editedUser.primaryLastName,
            secondLastName:editedUser.secondLastName,
            rut:editedUser.rut,
            rol: [await this.rolServices.getForCode(dto.rol)]
        });
        return this.get(id);
    }
    async delete(id: number): Promise<User>{
        const user = await this.get(id);
        if (!user) throw new NotFoundException('User does not exists')
        return await this.userRepository.remove(user);
    }
    async findByEmail(data: UserFindEmail){
        return await this.userRepository.createQueryBuilder('user')
            .where(data)
            .addSelect('user.password')
            .getOne();
    }
}
