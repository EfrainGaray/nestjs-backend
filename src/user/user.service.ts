import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from './entities/user.entity';
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import * as bcrypt from "bcrypt";
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userReposity: Repository<User>
    ) {}
    async all(): Promise<User[]> {
        return this.userReposity.find();
    }
    async create(user): Promise<User> {
        user.password = await bcrypt.hash(user.password, 12);
        return this.userReposity.save(user);
    }
    async get(id: number): Promise<User>{
        return this.userReposity.findOne({id});
    }
    async update(id,user): Promise<UpdateResult>{
        return this.userReposity.update(id,user);
    }
    async delete(id: number): Promise<DeleteResult>{
        return this.userReposity.delete(id);
    }
}
