import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSessionDto, UpdateSessionDto } from '../dtos';

import { Session } from '../entities';


@Injectable()
export class SessionService {

    
    constructor(
        @InjectRepository(Session) private readonly sessionRepository: Repository<Session>
    ) {}

    async create(dto: CreateSessionDto): Promise<Session> {
        const sessionExist = await this.sessionRepository.findOne({ date: dto.date });
        if (sessionExist) throw new BadRequestException('Session already registered with date');

        const newSession = this.sessionRepository.create(dto)
        const  session = await this.sessionRepository.save(newSession)

        //delete establishment.password;
        return session;
    }

    async update(id,dto: UpdateSessionDto): Promise<Session>{
        const session = await this.get(id)
        const editedSession = Object.assign(session, dto);
        return await this.sessionRepository.save(editedSession);
    }

    async get(id: number): Promise<Session>{
        const session = await this.sessionRepository.findOne(id);
        if (!session) throw new NotFoundException('Session does not exists')


        return  session;
    }

    async delete(id: number): Promise<Session>{
        const session = await this.get(id);
        if (!session) throw new NotFoundException('Session does not exists')
        return await this.sessionRepository.remove(session);
    }

    async all(): Promise<Session[]> {
        const  session = await this.sessionRepository.find({  })
        return session;
    }

}
