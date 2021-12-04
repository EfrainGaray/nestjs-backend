import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProcessDto, UpdateProcessDto } from '../dtos';
import { Process } from '../entities';

@Injectable()
export class ProcessService {


    constructor(
        @InjectRepository(Process) private readonly processRepository: Repository<Process>
    ) {}

    async create(dto: CreateProcessDto): Promise<Process> {
        const processExist = await this.processRepository.findOne({ rut_person: dto.rut_person });
        if (processExist) throw new BadRequestException('Process already registered with Rut');

        const newProcess = this.processRepository.create(dto)
        const  process = await this.processRepository.save(newProcess)

        return process;
    }

    async update(id,dto: UpdateProcessDto): Promise<Process>{
        const process = await this.get(id)
        const editedProcess = Object.assign(process, dto);
        return await this.processRepository.save(editedProcess);
    }

    async get(id: number): Promise<Process>{
        const process = await this.processRepository.findOne(id);
        if (!process) throw new NotFoundException('Process does not exists')


        return  process;
    }

    async delete(id: number): Promise<Process>{
        const process = await this.get(id);
        if (!process) throw new NotFoundException('Process does not exists')
        return await this.processRepository.remove(process);
    }

    async all(): Promise<Process[]> {
        const  process = await this.processRepository.find({  })
        return process;
    }
}
