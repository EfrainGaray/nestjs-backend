import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePersonDto, UpdatePersonDto } from '../dtos';
import { PersonService } from '../services';


@ApiTags('Persons routes')
@Controller('person')
export class PersonController {

    constructor(private personService: PersonService) {
    }

    @Post()
    async create(@Body() personCreate: CreatePersonDto){
        const data = await this.personService.create(personCreate);
        return { message: 'Person Registed', data };
    }

    @Put(':id')
    async update(@Body() room: UpdatePersonDto, @Param('id') id: number) {
        const data =  await  this.personService.update(id,room);
        return  { message: 'Person Updated', data };
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const data =  await this.personService.delete(id);
        return { message: 'Person deleted', data };
    }

    @Get()
    async all() {
        const data = await this.personService.all();
        return {data};
    }

    @Get(':id')
    async get(@Param('id') id: number){
        const data = await this.personService.get(id);
        return { data }
    }
}
