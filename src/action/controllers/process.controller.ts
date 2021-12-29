import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProcessDto, UpdateProcessDto } from '../dtos';
import { ProcessService } from '../services';


@ApiTags('Process routes')
@Controller('process')
export class ProcessController {
    constructor(private processService: ProcessService) {
    }

    @Post()
    async create(@Body() processCreate: any/*CreateProcessDto*/){
        //console.log(processCreate);
        const data = await this.processService.create(processCreate);
        return { message: 'Process Registed', data };
    }

    @Put(':id')
    async update(@Body() process: UpdateProcessDto, @Param('id') id: number) {
        const data =  await  this.processService.update(id,process);
        return  { message: 'Process Updated', data };
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const data =  await this.processService.delete(id);
        return { message: 'Process deleted', data };
    }

    @Get()
    async all() {
        const data = await this.processService.all();
        return {data};
    }

    @Get(':id')
    async get(@Param('id') id: number){
        const data = await this.processService.get(id);
        return { data }
    }
}
