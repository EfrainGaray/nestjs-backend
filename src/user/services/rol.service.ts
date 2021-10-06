import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRolDto, UpdateRolDto } from '../dtos';
import { Rol } from '../entities';

@Injectable()
export class RolService {

    constructor(
        @InjectRepository(Rol) private readonly rolRepository: Repository<Rol>
    ){

    }

    async all(): Promise<Rol[]> {
        const rols = await this.rolRepository.find({ })
        return rols;
    }

    async create(dto: CreateRolDto): Promise<Rol> {
        const rolExist = await this.rolRepository.findOne({ name: dto.name });
        if (rolExist) throw new BadRequestException('Rol already registered');

        const newRol = this.rolRepository.create(dto)
        const  rol = await this.rolRepository.save(newRol)

        return rol;
    }
    async delete(id: number): Promise<Rol>{
        const rol = await this.get(id);
        if (!rol) throw new NotFoundException('Rol does not exists')
        return await this.rolRepository.remove(rol);
    }

    async get(id: number): Promise<Rol>{
        const rol = await this.rolRepository.findOne(id);
        if (!rol) throw new NotFoundException('Rol does not exists')


        return  rol;
    }

    async update(id: number,dto: UpdateRolDto): Promise<Rol>{
        const rol = await this.get(id);

        if(rol.name != dto.name){
            const rolExist = await this.rolRepository.findOne({ name: dto.name });
        if (rolExist) throw new BadRequestException('Name Rol is already used');
        }
        
        const editedRol = Object.assign(rol, dto);
        return await this.rolRepository.save(editedRol);
    }

}
