import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";

import {Repository} from "typeorm";
import { RolService } from '.';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { Rol, User } from '../entities';


export interface UserFindEmail {
    id?: number;
    email?: string;
}


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        public rolServices: RolService
    ) {}
    
    async all(): Promise<User[]> {
        const  users = await this.userRepository.find({ relations:['rol'] })
        return users;
    }
    
    async create(dto: CreateUserDto): Promise<User> {
        const userExist = await this.userRepository.findOne({ email: dto.email });
        if (userExist) throw new BadRequestException('User already registered with email');
        let userTmp: User;
        let rol:Rol;
        if(dto.rol){
            const rol = await this.rolServices.getForCode(dto.rol);
            if (!rol) throw new BadRequestException('Rol not created');
        }
        
        const newUser = this.userRepository.create(
            {
                name:dto.name,
                password:dto.password,
                email:dto.email,
                primaryLastName:dto.primaryLastName,
                secondLastName:dto.secondLastName,
                rut:dto.rut,
                rol: [await this.rolServices.getForCode(dto.rol)]
        })
        const  user = await this.userRepository.save(newUser)

        delete user.password;
        return this.get(user.id);
    }
    async get(id: number): Promise<User>{
        const user = await this.userRepository.findOne(id,{relations: ['rol']});
        if (!user) throw new NotFoundException('User does not exists')
        
        delete user.password;

        return  user;
    }
    async update(id,dto: UpdateUserDto): Promise<User>{
        const user = await this.get(id)
        let rol:Rol;
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
