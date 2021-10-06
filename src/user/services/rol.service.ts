import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRolDto } from '../dtos';
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
        const userExist = await this.rolRepository.findOne({ name: dto.name });
        if (userExist) throw new BadRequestException('Rol already registered');

        const newRol = this.rolRepository.create(dto)
        const  rol = await this.rolRepository.save(newRol)

        return rol;
    }
}
