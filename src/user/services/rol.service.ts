import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from '../entities';

@Injectable()
export class RolService {
    constructor(
        @InjectRepository(Rol) private readonly rolRepository: Repository<Rol>
    ){

    }
}
