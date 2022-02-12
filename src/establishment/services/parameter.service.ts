import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParameterDto, UpdateParameterDto } from '../dtos';
import { Parameter } from '../entities';

@Injectable()
export class ParameterService {

    constructor(
        @InjectRepository(Parameter) private readonly parameterRepository: Repository<Parameter>
    ) {}

    async create(dto: CreateParameterDto): Promise<Parameter> {
        const parameterExist = await this.parameterRepository.findOne({ people_infected: dto.people_infected });
        if (parameterExist) throw new BadRequestException('Parameter already registered');
       
        const newParameter = this.parameterRepository.create(dto);
        const  parameter = await this.parameterRepository.save(newParameter)

        //delete establishment.password;
        return parameter;
    }

    async update(id,dto: UpdateParameterDto): Promise<Parameter>{
        const parameter = await this.get(id);
        const editedParameter = Object.assign(parameter, dto);
        return await this.parameterRepository.save(editedParameter);
    }

    async get(id: number): Promise<Parameter>{
        const parameter = await this.parameterRepository.findOne(id);
        if (!parameter) throw new NotFoundException('Parameter does not exists')


        return  parameter;
    }

    async delete(id: number): Promise<Parameter>{
        const parameter = await this.get(id);
        if (!parameter) throw new NotFoundException('Parameter does not exists')
        return await this.parameterRepository.remove(parameter);
    }

    async all(): Promise<Parameter[]> {
        const  parameter = await this.parameterRepository.find({  })
        return parameter;
    }

}
