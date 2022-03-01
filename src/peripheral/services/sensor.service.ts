import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sensor } from 'src/peripheral/entities';
import { Repository } from 'typeorm';
import { PeripheralService } from '.';
import { CreateSensorDto, UpdateSensorDto } from '../dtos';


@Injectable()
export class SensorService {
    constructor(
        @InjectRepository(Sensor) private readonly sensorRepository: Repository<Sensor>,
        public peripheralServices: PeripheralService
    ) {}

    async create(dto: CreateSensorDto): Promise<Sensor> {
        const sensorExist = await this.sensorRepository.findOne({ name: dto.name });
        if (sensorExist) throw new BadRequestException('Sensor already registered with name');

        const newSensor = this.sensorRepository.create(
            {
                name:dto.name,
                peripheral : await this.peripheralServices.getForName(dto.namePeripheral)
            }
            )
        const  sensor = await this.sensorRepository.save(newSensor)


        return sensor;
    }

    async update(id,dto: UpdateSensorDto): Promise<Sensor>{
        const sensor = await this.get(id)
        const editedSensor = Object.assign(sensor, dto);
        return await this.sensorRepository.save(editedSensor);
    }

    async get(id: number): Promise<Sensor>{
        const sensor = await this.sensorRepository.findOne(id, {relations: ['peripheral']});
        if (!sensor) throw new NotFoundException('Sensor does not exists')


        return  sensor;
    }

    async delete(id: number): Promise<Sensor>{
        const sensor = await this.get(id);
        if (!sensor) throw new NotFoundException('Sensor does not exists')
        return await this.sensorRepository.remove(sensor);
    }

    async all(): Promise<Sensor[]> {
        const  sensor = await this.sensorRepository.find({relations: ['peripheral']})
        return sensor;
    }

}
