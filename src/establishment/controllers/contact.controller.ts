import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateContactDto, UpdateContactDto } from '../dtos';
import {ContactService} from "../services/contact.service";


@ApiTags('Contacts routes')
@Controller('contact')
export class ContactController {
    constructor(private contactService: ContactService) {
    }

    @Post()
    async create(@Body() contactCreate: any/*CreateContactDto*/){
        const data = await this.contactService.create(contactCreate);
        return { message: 'Contact Registed', data };
    }

    @Put(':id')
    async update(@Body() contact: UpdateContactDto, @Param('id') id: number) {
        const data =  await  this.contactService.update(id,contact);
        return  { message: 'Contact Updated', data };
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const data =  await this.contactService.delete(id);
        return { message: 'Contact deleted', data };
    }

    @Get()
    async all() {
        const data = await this.contactService.all();
        return {data};
    }

    @Get(':id')
    async get(@Param('id') id: number){
        const data = await this.contactService.get(id);
        return { data }
    }

}
