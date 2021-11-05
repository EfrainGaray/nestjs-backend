import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePeripheralDto } from '../dtos';
import { UpdatePeripheralDto } from '../dtos/updatePeripheralDto';
import { PeripheralService } from '../services';


@ApiTags('Peripherals routes')
@Controller('peripheral')
export class PeripheralController {

    constructor(private peripheralService: PeripheralService) {
    }

    @Post()
    async create(@Body() peripheralcreate: CreatePeripheralDto){
        const data = await this.peripheralService.create(peripheralcreate);
        return { message: 'Peripheral Registed', data };
    }

    @Put(':id')
    async update(@Body() contact: UpdatePeripheralDto, @Param('id') id: number) {
        const data =  await  this.peripheralService.update(id,contact);
        return  { message: 'Peripheral Updated', data };
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const data =  await this.peripheralService.delete(id);
        return { message: 'Peripheral deleted', data };
    }

    @Get()
    async all() {
        const data = await this.peripheralService.all();
        return {data};
    }

    @Get(':id')
    async get(@Param('id') id: number){
        const data = await this.peripheralService.get(id);
        return { data }
    }
}
