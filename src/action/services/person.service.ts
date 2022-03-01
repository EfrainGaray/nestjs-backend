import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomService } from 'src/establishment/services';
import { Repository } from 'typeorm';
import { CreatePersonDto, UpdatePersonDto } from '../dtos';
import { Person } from '../entities';

@Injectable()
export class PersonService {

    constructor(
        @InjectRepository(Person) private readonly personRepository: Repository<Person>,
        public roomServices: RoomService
    ) {}

    async create(dto: CreatePersonDto): Promise<Person> {
        const personExist = await this.personRepository.findOne({ rut: dto.rut });
        if (personExist) throw new BadRequestException('Person already registered with rut');

        const newPerson = this.personRepository.create({
            rut:dto.rut,
            name: dto.name,
            primaryLastName:dto.primaryLastName,
            secondLastName:dto.secondLastName,
            email:dto.email,
            room:await this.roomServices.getForName(dto.nameRoom)
        })
        const  person = await this.personRepository.save(newPerson)

       
        return person;
    }

    async update(id,dto: UpdatePersonDto): Promise<Person>{
        const person = await this.get(id)
        const editedPerson = Object.assign(person, dto);
        return await this.personRepository.save(editedPerson);
    }

    async get(id: number): Promise<Person>{
        const person = await this.personRepository.findOne(id, {relations:['room']});
        if (!person) throw new NotFoundException('Person does not exists')


        return  person;
    }

    async delete(id: number): Promise<Person>{
        const person = await this.get(id);
        if (!person) throw new NotFoundException('Person does not exists')
        return await this.personRepository.remove(person);
    }

    async all(): Promise<Person[]> {
        const  person = await this.personRepository.find({relations:['room']})
        return person;
    }

    async getForRut(rutF: string): Promise<Person>{
        const person = await this.personRepository.findOne({ rut: rutF });
        if (!person) throw new NotFoundException('Person does not exists')
        return  person;
    }
}
