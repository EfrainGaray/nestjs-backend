import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnviromentParameterService } from 'src/peripheral/services';
import { Repository } from 'typeorm';
import { MitigatingActionService } from '.';
import { CreateProcessDto, UpdateProcessDto } from '../dtos';
import { Process } from '../entities';

@Injectable()
export class ProcessService {


    constructor(
        @InjectRepository(Process) private readonly processRepository: Repository<Process>,
        public mitigatingActionServices: MitigatingActionService,
        public enviromentalParameterServices: EnviromentParameterService
    ) {}

    async create(dto: CreateProcessDto): Promise<Process> {
        const processExist = await this.processRepository.findOne({ rut_person: dto.rut_person });
        if (processExist) throw new BadRequestException('Process already registered with Rut');

        const newProcess = this.processRepository.create({
            rut_person:dto.rut_person,
            type:dto.type,
            steps:dto.steps,
            mitigatingAction:await this.mitigatingActionServices.getForName(dto.mitigatingActionName),
            enviromentParameter:await this.enviromentalParameterServices.getForDate(dto.enviromentParameterDate)
        })
        const  process = await this.processRepository.save(newProcess)

        return process;
    }

    async update(id,dto: UpdateProcessDto): Promise<Process>{
        const process = await this.get(id)
        const editedProcess = Object.assign(process, dto);
        return await this.processRepository.save(editedProcess);
    }

    async get(id: number): Promise<Process>{
        const process = await this.processRepository.findOne(id, {relations:['mitigating_action']});
        if (!process) throw new NotFoundException('Process does not exists')


        return  process;
    }

    async delete(id: number): Promise<Process>{
        const process = await this.get(id);
        if (!process) throw new NotFoundException('Process does not exists')
        return await this.processRepository.remove(process);
    }

    async all(): Promise<Process[]> {
        const  process = await this.processRepository.find({relations:['mitigating_action']})
        return process;
    }
}
