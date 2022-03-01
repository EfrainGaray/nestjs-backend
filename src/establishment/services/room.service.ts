import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PeripheralService } from 'src/peripheral/services';
import { Repository } from 'typeorm';
import { CreateRoomDto, UpdateRoomDto } from '../dtos';
import { Room } from '../entities';


@Injectable()
export class RoomService {

    constructor(
        @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
        //public peripheralServices: PeripheralService
    ) {}

    async create(dto: CreateRoomDto): Promise<Room> {
        const roomExist = await this.roomRepository.findOne({ name: dto.name });
        if (roomExist) throw new BadRequestException('Room already registered with name');

        const newRoom = this.roomRepository.create({
            name:dto.name,
            capacity: dto.capacity,
            height: dto.height,
            width: dto.width,
            length:dto.length,
            //peripheral: await this.peripheralServices.getForName(dto.namePeripheral)

        })
        const  room = await this.roomRepository.save(newRoom)


        return room;
    }

    async update(id,dto: UpdateRoomDto): Promise<Room>{
        const room = await this.get(id)
        const editedRoom = Object.assign(room, dto);
        return await this.roomRepository.save(editedRoom);
    }

    async get(id: number): Promise<Room>{
        const room = await this.roomRepository.findOne(id, {relations: [ 'peripheral']});
        if (!room) throw new NotFoundException('Room does not exists')


        return  room;
    }

    async delete(id: number): Promise<Room>{
        const room = await this.get(id);
        if (!room) throw new NotFoundException('Room does not exists')
        return await this.roomRepository.remove(room);
    }

    async all(): Promise<Room[]> {
        const  room = await this.roomRepository.find({relations: [ 'peripheral']})
        return room;
    }

    async getForName(name: string): Promise<Room>{
        const room = await this.roomRepository.findOne({ name: name });
        if (!room) throw new NotFoundException('Room does not exists')
        return  room;
    }

}
