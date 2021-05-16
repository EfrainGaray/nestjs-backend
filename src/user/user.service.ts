import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from './entities/user.entity';
import {Repository} from "typeorm";
import {CreateUserDto, UpdateUserDto} from "./dtos";
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}
    async all(): Promise<User[]> {
        const  users = await this.userRepository.find({ select: ['id', 'name', 'email', 'avatar', 'updatedAt', 'createdAt'] })
        return users;
    }
    async create(dto: CreateUserDto): Promise<User> {
        const userExist = await this.userRepository.findOne({ email: dto.email });
        if (userExist) throw new BadRequestException('User already registered with email');

        const newUser = this.userRepository.create(dto)
        const  user = await this.userRepository.save(newUser)

        delete user.password;
        return user;
    }
    async get(id: number): Promise<User>{
        const user = await this.userRepository.findOne(id);
        if (!user) throw new NotFoundException('User does not exists')

        delete user.password;
        return user;
        return  user;
    }
    async update(id,dto: UpdateUserDto): Promise<User>{
        const user = await this.get(id)
        const editedUser = Object.assign(user, dto);
        return await this.userRepository.save(editedUser);
    }
    async delete(id: number): Promise<User>{
        const user = await this.get(id);
        if (!user) throw new NotFoundException('User does not exists')
        return await this.userRepository.remove(user);
    }
}
