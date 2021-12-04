import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto, UpdatePersonDto } from '../dtos';
import { Person } from '../entities';

@Injectable()
export class PersonService {

    constructor(
        @InjectRepository(Person) private readonly personRepository: Repository<Person>
    ) {}

    async create(dto: CreatePersonDto): Promise<Person> {
        const personExist = await this.personRepository.findOne({ rut: dto.rut });
        if (personExist) throw new BadRequestException('Person already registered with rut');

        const newPerson = this.personRepository.create(dto)
        const  person = await this.personRepository.save(newPerson)

        //delete establishment.password;
        return person;
    }

    async update(id,dto: UpdatePersonDto): Promise<Person>{
        const person = await this.get(id)
        const editedPerson = Object.assign(person, dto);
        return await this.personRepository.save(editedPerson);
    }

    async get(id: number): Promise<Person>{
        const person = await this.personRepository.findOne(id);
        if (!person) throw new NotFoundException('Person does not exists')


        return  person;
    }

    async delete(id: number): Promise<Person>{
        const person = await this.get(id);
        if (!person) throw new NotFoundException('Person does not exists')
        return await this.personRepository.remove(person);
    }

    async all(): Promise<Person[]> {
        const  person = await this.personRepository.find({  })
        return person;
    }
}
