import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAlarmStateDto, UpdateAlarmStateDto } from '../dtos';
import { AlarmStateService } from '../services';


@ApiTags('Alarms States routes')
@Controller('alarm-state')
export class AlarmStateController {
    constructor(private alarmStateService: AlarmStateService) {
    }

    @Post()
    async create(@Body() alarmStateCreate: any/*CreateAlarmStateDto*/){
        console.log(alarmStateCreate);
        const data = await this.alarmStateService.create(alarmStateCreate);
        return { message: 'Alarm State Registed', data };
    }

    @Put(':id')
    async update(@Body() alarmState: UpdateAlarmStateDto, @Param('id') id: number) {
        const data =  await  this.alarmStateService.update(id,alarmState);
        return  { message: 'Alarm State Updated', data };
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const data =  await this.alarmStateService.delete(id);
        return { message: 'Alarm Delete deleted', data };
    }

    @Get()
    async all() {
        const data = await this.alarmStateService.all();
        return {data};
    }

    @Get(':id')
    async get(@Param('id') id: number){
        const data = await this.alarmStateService.get(id);
        return { data }
    }
}
