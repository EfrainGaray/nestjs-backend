import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomService } from '.';
import { CreateSessionDto, UpdateSessionDto } from '../dtos';

import { Session } from '../entities';


@Injectable()
export class SessionService {

    
    constructor(
        @InjectRepository(Session) private readonly sessionRepository: Repository<Session>,
        public roomServices: RoomService
    ) {}

    async create(dto: CreateSessionDto): Promise<Session> {
        const sessionExist = await this.sessionRepository.findOne({ date: dto.date });
        if (sessionExist) throw new BadRequestException('Session already registered with date');

        const newSession = this.sessionRepository.create({
            date:dto.date,
            duration: dto.duration,
            background_CO2:dto.background_CO2,
            exterior_ventilation: dto.exterior_ventilation,
            event_repeats:dto.event_repeats,
            room: await this.roomServices.getForName(dto.roomName)
            }
        )
        const  session = await this.sessionRepository.save(newSession)

        return session;
    }

    async update(id,dto: UpdateSessionDto): Promise<Session>{
        const session = await this.get(id)
        const editedSession = Object.assign(session, dto);
        return await this.sessionRepository.save(editedSession);
    }

    async get(id: number): Promise<Session>{
        const session = await this.sessionRepository.findOne(id,{relations:['room']});
        if (!session) throw new NotFoundException('Session does not exists')


        return  session;
    }

    async delete(id: number): Promise<Session>{
        const session = await this.get(id);
        if (!session) throw new NotFoundException('Session does not exists')
        return await this.sessionRepository.remove(session);
    }

    async all(): Promise<Session[]> {
        const  session = await this.sessionRepository.find({relations:['room']})
        return session;
    }

    async getForDate(date: string): Promise<Session>{
        const session = await this.sessionRepository.findOne({ date: date });
        if (!session) throw new NotFoundException('Session does not exists')
        return  session;
    }

}
