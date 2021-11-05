import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoomDto, UpdateRoomDto } from '../dtos';
import { RoomService } from '../services';


@ApiTags('Rooms routes')
@Controller('room')
export class RoomController {
    constructor(private roomService: RoomService) {
    }

    @Post()
    async create(@Body() roomCreate: CreateRoomDto){
        const data = await this.roomService.create(roomCreate);
        return { message: 'Room Registed', data };
    }

    @Put(':id')
    async update(@Body() room: UpdateRoomDto, @Param('id') id: number) {
        const data =  await  this.roomService.update(id,room);
        return  { message: 'Room Updated', data };
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const data =  await this.roomService.delete(id);
        return { message: 'Room deleted', data };
    }

    @Get()
    async all() {
        const data = await this.roomService.all();
        return {data};
    }

    @Get(':id')
    async get(@Param('id') id: number){
        const data = await this.roomService.get(id);
        return { data }
    }

}
