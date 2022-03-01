import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstablismentService } from '.';
import { UpdateContactDto } from '../dtos';
import { CreateContactDto } from '../dtos/createContactDto';
import { Contact } from '../entities';


@Injectable()
export class ContactService {
    constructor(
        @InjectRepository(Contact) private readonly contactRepository: Repository<Contact>,
        public establishmentServices: EstablismentService
    ) {}

    async create(dto: CreateContactDto): Promise<Contact> {
        const contactExist = await this.contactRepository.findOne({ email: dto.email });
        if (contactExist) throw new BadRequestException('Contact already registered with email');

        const newContact = this.contactRepository.create({
                name:dto.name,
                primaryLastName:dto.primaryLastName,
                secondLastName:dto.secondLastName,
                email:dto.email,
                position:dto.position,
                establishment: await this.establishmentServices.getForRut(dto.rutEstablishment)
        })
        const  contact = await this.contactRepository.save(newContact)

        return this.get(contact.id);
    }

    async update(id,dto: UpdateContactDto): Promise<Contact>{
        const contact = await this.get(id)
        const editedContact = Object.assign(contact, dto);
        return await this.contactRepository.save(editedContact);
    }

    async get(id: number): Promise<Contact>{
        const contact = await this.contactRepository.findOne(id, {relations: ['establishment']});
        if (!contact) throw new NotFoundException('Contact does not exists')


        return  contact;
    }

    async delete(id: number): Promise<Contact>{
        const contact = await this.get(id);
        if (!contact) throw new NotFoundException('Contact does not exists')
        return await this.contactRepository.remove(contact);
    }

    async all(): Promise<Contact[]> {
        const  contact = await this.contactRepository.find({relations: ['establishment']})
        return contact;
    }

    async getForEmail(email: string): Promise<Contact>{
        const contact = await this.contactRepository.findOne({ email: email });
        return  contact;
    }
}
