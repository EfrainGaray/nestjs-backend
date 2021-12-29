import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSensorDto, UpdateSensorDto } from '../dtos';

import { SensorService } from '../services/sensor.service';


@ApiTags('Sensor routes')
@Controller('sensor')
export class SensorController {
    constructor(private sensorService: SensorService) {
    }

    @Post()
    async create(@Body() sensorCreate: CreateSensorDto){
        const data = await this.sensorService.create(sensorCreate);
        return { message: 'Sensor Registed', data };
    }

    @Put(':id')
    async update(@Body() contact: UpdateSensorDto, @Param('id') id: number) {
        const data =  await  this.sensorService.update(id,contact);
        return  { message: 'Sensor Updated', data };
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const data =  await this.sensorService.delete(id);
        return { message: 'Sensor deleted', data };
    }

    @Get()
    async all() {
        const data = await this.sensorService.all();
        return {data};
    }

    @Get(':id')
    async get(@Param('id') id: number){
        const data = await this.sensorService.get(id);
        return { data }
    }
}
