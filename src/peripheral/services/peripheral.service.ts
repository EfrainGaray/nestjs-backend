import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstablismentService } from 'src/establishment/services';
import { Repository } from 'typeorm';
import { CreatePeripheralDto, UpdatePeripheralDto } from '../dtos';

import { Peripheral } from '../entities';

@Injectable()
export class PeripheralService {

    constructor(
        @InjectRepository(Peripheral) private readonly peripheralRepository: Repository<Peripheral>,
        public establishmentServices: EstablismentService
    ) {}

    async create(dto: CreatePeripheralDto): Promise<Peripheral> {
        const peripheralExist = await this.peripheralRepository.findOne({ name: dto.name });
        if (peripheralExist) throw new BadRequestException('Peripheral already registered with name');

        const newPeripheral = this.peripheralRepository.create({
            ip: dto.ip,
            name: dto.name,
            localization: dto.localization,
            date_state: dto.date_state,
            state: dto.state,
            establishment: await this.establishmentServices.getForRut(dto.rutEstablishment)
        })
        const  peripheral = await this.peripheralRepository.save(newPeripheral)

        return peripheral;
    }

    async update(id,dto: UpdatePeripheralDto): Promise<Peripheral>{
        const peripheral = await this.get(id)
        const editedPeripheral = Object.assign(peripheral, dto);
        return await this.peripheralRepository.save(editedPeripheral);
    }

    async get(id: number): Promise<Peripheral>{
        const peripheral = await this.peripheralRepository.findOne(id, { relations:['room', 'sensor', 'establishment'/*, 'enviroment_parameter'*/] });
        if (!peripheral) throw new NotFoundException('Peripheral does not exists')


        return  peripheral;
    }

    async delete(id: number): Promise<Peripheral>{
        const peripheral = await this.get(id);
        if (!peripheral) throw new NotFoundException('Peripheral does not exists')
        return await this.peripheralRepository.remove(peripheral);
    }

    async all(): Promise<Peripheral[]> {
        const  peripheral = await this.peripheralRepository.find({ relations:['room', 'sensor', 'establishment'/*, 'enviroment_parameter'*/] })
        return peripheral;
    }

    async getForName(name: string): Promise<Peripheral>{
        const peripheral = await this.peripheralRepository.findOne({ name: name });
        return  peripheral;
    }
}
