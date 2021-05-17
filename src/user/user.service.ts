import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from './entities/user.entity';
import {Repository} from "typeorm";
import {CreateUserDto, UpdateUserDto} from "./dtos";

export interface UserFindEmail {
    id?: number;
    email?: string;
}


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
    async get(id: number,userEntity?: User): Promise<User>{
        const user = await this.userRepository.findOne(id)
            .then(u => (!userEntity ? u : !!u && userEntity.id === u.id ? u : null));

        if (!user)
            throw new NotFoundException('User does not exists or unauthorized');
        return user;
    }
    async update(id,dto: UpdateUserDto,userEntity?: User): Promise<any>{
        const user = await this.get(id,userEntity)
        const editedUser = Object.assign(user, dto);
        const {password, ...newUser} = await this.userRepository.save(editedUser)
        return newUser;
    }
    async delete(id: number): Promise<User>{
        const user = await this.get(id);
        if (!user) throw new NotFoundException('User does not exists')
        return await this.userRepository.remove(user);
    }
    async findByEmail(data: UserFindEmail){
        return await this.userRepository.createQueryBuilder('user')
            .where(data)
            .addSelect('user.password')
            .getOne();
    }
}
