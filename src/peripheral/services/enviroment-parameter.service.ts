import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateEnviromentalParameterDto, UpdateEnviromentalParameterDto } from '../dtos';
import { EnviromentParameter } from '../entities';
import { PeripheralService } from './peripheral.service';

@Injectable()
export class EnviromentParameterService {
    constructor(
        @InjectRepository(EnviromentParameter) private readonly enviromentalParameterRepository: Repository<EnviromentParameter>, 
        //public peripheralServices: PeripheralService
    ) {}
    
    async create(dto: CreateEnviromentalParameterDto): Promise<EnviromentParameter> {
        const enviromentParameterExist = await this.enviromentalParameterRepository.findOne({ temperature: dto.temperature });
        if (enviromentParameterExist) throw new BadRequestException('Enviroment Parameter already registered with name');

        const newEnviromentParameter = this.enviromentalParameterRepository.create({
                date_time: dto.date_time,
                relative_humidity: dto.relative_humidity,
                temperature: dto.temperature,
                pressure: dto.pressure,
                CO2: dto.CO2,
                CO2_alarm:dto.CO2_alarm,
                algorithm_result:dto.algorithm_result,
                SGP40_voc_index: dto.SPG40_voc_index,
                SGP40_emp:dto.SPG40_emp,
                SGP40_hr:dto.SPG40_hr,
               //peripheral:await this.peripheralServices.getForName(dto.namePeripheral)
             }
        )
        const  enviromentalParameter = await this.enviromentalParameterRepository.save(newEnviromentParameter)

        return enviromentalParameter;
    }

    async update(id,dto: UpdateEnviromentalParameterDto): Promise<EnviromentParameter>{
        const enviromentalParameter = await this.get(id)
        const editedEnviromentalParameter = Object.assign(enviromentalParameter, dto);
        return await this.enviromentalParameterRepository.save(editedEnviromentalParameter);
    }

    async get(id: number): Promise<EnviromentParameter>{
        const enviromentalParameter = await this.enviromentalParameterRepository.findOne(id,{relations:['peripheral']});
        if (!enviromentalParameter) throw new NotFoundException('Enviroment Parameter does not exists')


        return  enviromentalParameter;
    }

    async delete(id: number): Promise<EnviromentParameter>{
        const enviromentalParameter = await this.get(id);
        if (!enviromentalParameter) throw new NotFoundException('Enviroment Parameter does not exists')
        return await this.enviromentalParameterRepository.remove(enviromentalParameter);
    }

    async all(): Promise<EnviromentParameter[]> {
        const  enviromentalParameter = await this.enviromentalParameterRepository.find({relations:['peripheral']})
        return enviromentalParameter;
    }

    async getForDate(dateTime: string): Promise<EnviromentParameter>{
        const enviromentalParameter = await this.enviromentalParameterRepository.findOne({ date_time: dateTime });
        if (!enviromentalParameter) throw new NotFoundException('Enviroment Parameter does not exists')
        return  enviromentalParameter;
    }

}
