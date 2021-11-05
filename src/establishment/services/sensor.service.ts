import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sensor } from 'src/peripheral/entities';
import { Repository } from 'typeorm';
import { CreateSensorDto, UpdateSensorDto } from '../dtos';

@Injectable()
export class SensorService {
    constructor(
        @InjectRepository(Sensor) private readonly sensorRepository: Repository<Sensor>
    ) {}

    async create(dto: CreateSensorDto): Promise<Sensor> {
        const sensorExist = await this.sensorRepository.findOne({ name: dto.name });
        if (sensorExist) throw new BadRequestException('Sensor already registered with name');

        const newSensor = this.sensorRepository.create(dto)
        const  sensor = await this.sensorRepository.save(newSensor)

        //delete establishment.password;
        return sensor;
    }

    async update(id,dto: UpdateSensorDto): Promise<Sensor>{
        const sensor = await this.get(id)
        const editedSensor = Object.assign(sensor, dto);
        return await this.sensorRepository.save(editedSensor);
    }

    async get(id: number): Promise<Sensor>{
        const sensor = await this.sensorRepository.findOne(id);
        if (!sensor) throw new NotFoundException('Sensor does not exists')


        return  sensor;
    }

    async delete(id: number): Promise<Sensor>{
        const sensor = await this.get(id);
        if (!sensor) throw new NotFoundException('Sensor does not exists')
        return await this.sensorRepository.remove(sensor);
    }

    async all(): Promise<Sensor[]> {
        const  sensor = await this.sensorRepository.find({  })
        return sensor;
    }

}
