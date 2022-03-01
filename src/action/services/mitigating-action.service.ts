import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonService } from '.';
import { CreateMitigatingActionDto, UpdateMitigatingActionDto } from '../dtos';
import { MitigatingAction } from '../entities';

@Injectable()
export class MitigatingActionService {

    constructor(
        @InjectRepository(MitigatingAction) private readonly mitigatingActionRepository: Repository<MitigatingAction>,
        public personServices: PersonService
    ) {}

    async create(dto: CreateMitigatingActionDto): Promise<MitigatingAction> {
        const mitigatingActionExist = await this.mitigatingActionRepository.findOne({ name: dto.name });
        if (mitigatingActionExist) throw new BadRequestException('Mitigating Action already registered with name');

        const newMitigatingAction = this.mitigatingActionRepository.create({
            name:dto.name,
            type:dto.type,
            person:await this.personServices.getForRut(dto.personRut)
        })
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
        const mitigatingAction = await this.mitigatingActionRepository.findOne(id, {relations:['person']});
        if (!mitigatingAction) throw new NotFoundException('Mitigating Action does not exists')


        return  mitigatingAction;
    }

    async delete(id: number): Promise<MitigatingAction>{
        const mitigatingAction = await this.get(id);
        if (!mitigatingAction) throw new NotFoundException('Mitigating Action does not exists')
        return await this.mitigatingActionRepository.remove(mitigatingAction);
    }

    async all(): Promise<MitigatingAction[]> {
        const  mitigatingAction = await this.mitigatingActionRepository.find({relations:['person']})
        return mitigatingAction;
    }

    async getForName(name: string): Promise<MitigatingAction>{
        const mitigatingAction = await this.mitigatingActionRepository.findOne({ name: name });
        if (!mitigatingAction) throw new NotFoundException('Mitigating Action does not exists')
        return  mitigatingAction;
    }
}
