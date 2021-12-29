import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateEstablishmentDto, CreateEstablishmentDto } from '../dtos';
import { EstablismentService } from '../services';


@ApiTags('Establishments routes')
@Controller('establishment')
export class EstablishmentController {
    constructor(private establishmentService: EstablismentService) {
    }

    @Get()
    async all() {
        const data = await this.establishmentService.all();
        return {data};
    }

    @Get(':id')
    async get(@Param('id') id: number){
        const data = await this.establishmentService.get(id);
        return { data }
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const data =  await this.establishmentService.delete(id);
        return { message: 'Establishment deleted', data };
    }

    @Put(':id')
    async update(@Body() establishment: UpdateEstablishmentDto, @Param('id') id: number) {
        const data =  await  this.establishmentService.update(id,establishment);
        return  { message: 'Establishment Updated', data };
    }

    @Post()
    async create(@Body() establishmentCreate: any /*CreateEstablishmentDto*/){
        console.log(establishmentCreate);
        const data = await this.establishmentService.create(establishmentCreate);
        return { message: 'Establishment Registed', data };
    }
}
