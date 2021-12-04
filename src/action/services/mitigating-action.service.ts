import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMitigatingActionDto, UpdateMitigatingActionDto } from '../dtos';
import { MitigatingAction } from '../entities';

@Injectable()
export class MitigatingActionService {

    constructor(
        @InjectRepository(MitigatingAction) private readonly mitigatingActionRepository: Repository<MitigatingAction>
    ) {}

    async create(dto: CreateMitigatingActionDto): Promise<MitigatingAction> {
        const mitigatingActionExist = await this.mitigatingActionRepository.findOne({ name: dto.name });
        if (mitigatingActionExist) throw new BadRequestException('Mitigating Action already registered with name');

        const newMitigatingAction = this.mitigatingActionRepository.create(dto)
        const  mitigatingAction = await this.mitigatingActionRepository.save(newMitigatingAction)

        //delete establishment.password;
        return mitigatingAction;
    }

    async update(id,dto: UpdateMitigatingActionDto): Promise<MitigatingAction>{
        const mitigatingAction = await this.get(id)
        const editedMitigatingAction = Object.assign(mitigatingAction, dto);
        return await this.mitigatingActionRepository.save(editedMitigatingAction);
    }

    async get(id: number): Promise<MitigatingAction>{
        const mitigatingAction = await this.mitigatingActionRepository.findOne(id);
        if (!mitigatingAction) throw new NotFoundException('Mitigating Action does not exists')


        return  mitigatingAction;
    }

    async delete(id: number): Promise<MitigatingAction>{
        const mitigatingAction = await this.get(id);
        if (!mitigatingAction) throw new NotFoundException('Mitigating Action does not exists')
        return await this.mitigatingActionRepository.remove(mitigatingAction);
    }

    async all(): Promise<MitigatingAction[]> {
        const  mitigatingAction = await this.mitigatingActionRepository.find({  })
        return mitigatingAction;
    }
}
