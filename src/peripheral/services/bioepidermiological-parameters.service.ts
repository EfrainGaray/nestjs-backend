import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBioepidermiologicalParametersDto, updateBioepidermiologicalParametersDto } from '../dtos';
import { BioepidermiologicalParameters } from '../entities';

@Injectable()
export class BioepidermiologicalParametersService {
    
    constructor(
        @InjectRepository(BioepidermiologicalParameters) private readonly bioepidermiologicalParametersRepository: Repository<BioepidermiologicalParameters>
    ) {}

    async create(dto: CreateBioepidermiologicalParametersDto): Promise<BioepidermiologicalParameters> {
        const bioepidermiologicalParametersExist = await this.bioepidermiologicalParametersRepository.findOne({ id: dto.id});
        if (bioepidermiologicalParametersExist) throw new BadRequestException('Bioepidermiological Parameter already registered with name');

        const newBioepidermiologicalParameters = this.bioepidermiologicalParametersRepository.create(dto)
        const  bioepidermiologicalParameters = await this.bioepidermiologicalParametersRepository.save(newBioepidermiologicalParameters)

        //delete establishment.password;
        return bioepidermiologicalParameters;
    }

    async update(id,dto: updateBioepidermiologicalParametersDto): Promise<BioepidermiologicalParameters>{
        const bioepidermiologicalParameters = await this.get(id)
        const editedBioepidermiologicalParameters = Object.assign(bioepidermiologicalParameters, dto);
        return await this.bioepidermiologicalParametersRepository.save(editedBioepidermiologicalParameters);
    }

    async get(id: number): Promise<BioepidermiologicalParameters>{
        const bioepidermiologicalParameters = await this.bioepidermiologicalParametersRepository.findOne(id);
        if (!bioepidermiologicalParameters) throw new NotFoundException('Bioepidermiological Parameter does not exists')


        return  room;
    }

    async delete(id: number): Promise<BioepidermiologicalParameters>{
        const bioepidermiologicalParameters = await this.get(id);
        if (!bioepidermiologicalParameters) throw new NotFoundException('Bioepidermiological Parameter does not exists')
        return await this.bioepidermiologicalParametersRepository.remove(bioepidermiologicalParameters);
    }

    async all(): Promise<BioepidermiologicalParameters[]> {
        const  bioepidermiologicalParameters = await this.bioepidermiologicalParametersRepository.find({  })
        return bioepidermiologicalParameters;
    }
}
