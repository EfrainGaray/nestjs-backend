import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEnviromentalParameterDto, UpdateEnviromentalParameterDto } from '../dtos';
import { EnviromentParameter } from '../entities';

@Injectable()
export class EnviromentParameterService {
    constructor(
        @InjectRepository(EnviromentParameter) private readonly enviromentalParameterRepository: Repository<EnviromentParameter>
    ) {}
    
    async create(dto: CreateEnviromentalParameterDto): Promise<EnviromentParameter> {
        const enviromentParameterExist = await this.enviromentalParameterRepository.findOne({ temperature: dto.temperature });
        if (enviromentParameterExist) throw new BadRequestException('Enviroment Parameter already registered with name');

        const newEnviromentParameter = this.enviromentalParameterRepository.create(dto)
        const  enviromentalParameter = await this.enviromentalParameterRepository.save(newEnviromentParameter)

        //delete establishment.password;
        return enviromentalParameter;
    }

    async update(id,dto: UpdateEnviromentalParameterDto): Promise<EnviromentParameter>{
        const enviromentalParameter = await this.get(id)
        const editedEnviromentalParameter = Object.assign(enviromentalParameter, dto);
        return await this.enviromentalParameterRepository.save(editedEnviromentalParameter);
    }

    async get(id: number): Promise<EnviromentParameter>{
        const enviromentalParameter = await this.enviromentalParameterRepository.findOne(id);
        if (!enviromentalParameter) throw new NotFoundException('Enviroment Parameter does not exists')


        return  enviromentalParameter;
    }

    async delete(id: number): Promise<EnviromentParameter>{
        const enviromentalParameter = await this.get(id);
        if (!enviromentalParameter) throw new NotFoundException('Enviroment Parameter does not exists')
        return await this.enviromentalParameterRepository.remove(enviromentalParameter);
    }

    async all(): Promise<EnviromentParameter[]> {
        const  enviromentalParameter = await this.enviromentalParameterRepository.find({  })
        return enviromentalParameter;
    }


}
