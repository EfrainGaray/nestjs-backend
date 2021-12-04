import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMitigatingActionDto, UpdateMitigatingActionDto } from '../dtos';
import { MitigatingActionService } from '../services';


@ApiTags('Mitigating Action routes')
@Controller('mitigating-action')
export class MitigatingActionController {
    constructor(private mitigatingActionService: MitigatingActionService) {
    }

    @Post()
    async create(@Body() mitigatinActionCreate: CreateMitigatingActionDto){
        const data = await this.mitigatingActionService.create(mitigatinActionCreate);
        return { message: 'Mitigating Action Registed', data };
    }

    @Put(':id')
    async update(@Body() mitigatingAction: UpdateMitigatingActionDto, @Param('id') id: number) {
        const data =  await  this.mitigatingActionService.update(id,mitigatingAction);
        return  { message: 'Mitigating Action Updated', data };
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const data =  await this.mitigatingActionService.delete(id);
        return { message: 'Mitigating Action deleted', data };
    }

    @Get()
    async all() {
        const data = await this.mitigatingActionService.all();
        return {data};
    }

    @Get(':id')
    async get(@Param('id') id: number){
        const data = await this.mitigatingActionService.get(id);
        return { data }
    }
}
