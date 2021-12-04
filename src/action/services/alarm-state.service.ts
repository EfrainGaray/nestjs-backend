import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlarmStateDto, UpdateAlarmStateDto } from '../dtos';
import { AlarmState } from '../entities';

@Injectable()
export class AlarmStateService {

    constructor(
        @InjectRepository(AlarmState) private readonly alarmStateRepository: Repository<AlarmState>
    ) {}

    async create(dto: CreateAlarmStateDto): Promise<AlarmState> {
        const alarmStateExist = await this.alarmStateRepository.findOne({ value: dto.value });
        if (alarmStateExist) throw new BadRequestException('Alarm Status already registered with value');

        const newAlarmState = this.alarmStateRepository.create(dto)
        const  alarmState = await this.alarmStateRepository.save(newAlarmState)

        //delete establishment.password;
        return alarmState;
    }

    async update(id,dto: UpdateAlarmStateDto): Promise<AlarmState>{
        const alarmState = await this.get(id)
        const editedAlarmState = Object.assign(alarmState, dto);
        return await this.alarmStateRepository.save(editedAlarmState);
    }

    async get(id: number): Promise<AlarmState>{
        const alarmState = await this.alarmStateRepository.findOne(id);
        if (!alarmState) throw new NotFoundException('Alarm State does not exists')


        return  alarmState;
    }

    async delete(id: number): Promise<AlarmState>{
        const alarmState = await this.get(id);
        if (!alarmState) throw new NotFoundException('Alarm State does not exists')
        return await this.alarmStateRepository.remove(alarmState);
    }

    async all(): Promise<AlarmState[]> {
        const  alarmState = await this.alarmStateRepository.find({  })
        return alarmState;
    }
}
