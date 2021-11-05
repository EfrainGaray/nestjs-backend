import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";

import {Repository} from "typeorm";
import { UpdateEstablishmentDto, CreateEstablishmentDto } from '../dtos';
import { Establishment } from '../entities';




@Injectable()
export class EstablismentService {
    constructor(
        @InjectRepository(Establishment) private readonly establishmentRepository: Repository<Establishment>
    ) {}
    
    async all(): Promise<Establishment[]> {
        const  establishments = await this.establishmentRepository.find({  })
        return establishments;
    }
    async get(id: number): Promise<Establishment>{
        const establishment = await this.establishmentRepository.findOne(id);
        if (!establishment) throw new NotFoundException('Establishment does not exists')


        return  establishment;
    }

    async delete(id: number): Promise<Establishment>{
        const establishment = await this.get(id);
        if (!establishment) throw new NotFoundException('Establishment does not exists')
        return await this.establishmentRepository.remove(establishment);
    }

    async update(id,dto: UpdateEstablishmentDto): Promise<Establishment>{
        const establishment = await this.get(id)
        const editedEstablishment = Object.assign(establishment, dto);
        return await this.establishmentRepository.save(editedEstablishment);
    }

    async create(dto: CreateEstablishmentDto): Promise<Establishment> {
        const userExist = await this.establishmentRepository.findOne({ rut: dto.rut });
        if (userExist) throw new BadRequestException('Establishment already registered with rut');

        const newEstablishment = this.establishmentRepository.create(dto)
        const  establishment = await this.establishmentRepository.save(newEstablishment)

        //delete establishment.password;
        return establishment;
    }
}
