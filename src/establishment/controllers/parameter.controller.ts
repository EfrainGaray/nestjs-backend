import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateParameterDto,  UpdateParameterDto} from '../dtos';
import { ParameterService } from '../services';


@ApiTags('Parameters routes')
@Controller('parameter')
export class ParameterController {
    constructor(private parameterService: ParameterService) {
    }

    @Post()
    async create(@Body() parameterService: CreateParameterDto){
        const data = await this.parameterService.create(parameterService);
        return { message: 'Parameter Registed', data };
    }

    @Put(':id')
    async update(@Body() parameter: UpdateParameterDto, @Param('id') id: number) {
        const data =  await  this.parameterService.update(id,parameter);
        return  { message: 'Parameter Updated', data };
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const data =  await this.parameterService.delete(id);
        return { message: 'Parameter deleted', data };
    }
    
    @Get()
    async all() {
        const data = await this.parameterService.all();
        return {data};
    }

    @Get(':id')
    async get(@Param('id') id: number){
        const data = await this.parameterService.get(id);
        return { data }
    }


}
