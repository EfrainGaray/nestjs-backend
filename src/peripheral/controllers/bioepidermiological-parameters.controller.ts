import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateBioepidermiologicalParametersDto, updateBioepidermiologicalParametersDto } from '../dtos';
import { BioepidermiologicalParametersService } from '../services';


@ApiTags('Bioepidermiological Parameters routes')
@Controller('bioepidermiological-parameters')
export class BioepidermiologicalParametersController {
    constructor(private bioepidermiologicalParametersService: BioepidermiologicalParametersService) {
    }
    
    @Post()
    async create(@Body() bioepidermiologicalParametersCreate: CreateBioepidermiologicalParametersDto){
        const data = await this.bioepidermiologicalParametersService.create(bioepidermiologicalParametersCreate);
        return { message: 'Bioepidermiological Parameter Registed', data };
    }

    @Put(':id')
    async update(@Body() bioepidermiologicalParameters: updateBioepidermiologicalParametersDto, @Param('id') id: number) {
        const data =  await  this.bioepidermiologicalParametersService.update(id,bioepidermiologicalParameters);
        return  { message: 'Bioepidermiological Parameter Updated', data };
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const data =  await this.bioepidermiologicalParametersService.delete(id);
        return { message: 'Bioepidermiological Parameter deleted', data };
    }

    @Get()
    async all() {
        const data = await this.bioepidermiologicalParametersService.all();
        return {data};
    }

    @Get(':id')
    async get(@Param('id') id: number){
        const data = await this.bioepidermiologicalParametersService.get(id);
        return { data }
    }
}
