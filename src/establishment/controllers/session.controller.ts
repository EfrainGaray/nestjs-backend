import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSessionDto, UpdateSessionDto } from '../dtos';
import { SessionService } from '../services';



@ApiTags('Sessions routes')
@Controller('session')
export class SessionController {
    constructor(private sessionService: SessionService) {
    }

    @Post()
    async create(@Body() sessionCreate: any/*CreateSessionDto*/){
        console.log(sessionCreate);
        const data = await this.sessionService.create(sessionCreate);
        return { message: 'Session Registed', data };
    }
    
    @Put(':id')
    async update(@Body() session: UpdateSessionDto, @Param('id') id: number) {
        const data =  await  this.sessionService.update(id,session);
        return  { message: 'Session Updated', data };
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const data =  await this.sessionService.delete(id);
        return { message: 'Session deleted', data };
    }

    @Get()
    async all() {
        const data = await this.sessionService.all();
        return {data};
    }

    @Get(':id')
    async get(@Param('id') id: number){
        const data = await this.sessionService.get(id);
        return { data }
    }

}
