import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateEnviromentalParameterDto, UpdateEnviromentalParameterDto } from '../dtos';
import { EnviromentParameterService } from '../services';


@ApiTags('Enviromental Parameters routes')
@Controller('enviroment-parameter')
export class EnviromentParameterController {
    constructor(private enviromentParameterService: EnviromentParameterService) {
    }

    @Post()
    async create(@Body() enviromentParameter: CreateEnviromentalParameterDto){
        const data = await this.enviromentParameterService.create(enviromentParameter);
        return { message: 'Enviroment Parameter Registed', data };
    }

    @Put(':id')
    async update(@Body() room: UpdateEnviromentalParameterDto, @Param('id') id: number) {
        const data =  await  this.enviromentParameterService.update(id,room);
        return  { message: 'Enviroment Parameteroom Updated', data };
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const data =  await this.enviromentParameterService.delete(id);
        return { message: 'Enviroment Parameter deleted', data };
    }

    @Get()
    async all() {
        const data = await this.enviromentParameterService.all();
        return {data};
    }

    @Get(':id')
    async get(@Param('id') id: number){
        const data = await this.enviromentParameterService.get(id);
        return { data }
    }

}
