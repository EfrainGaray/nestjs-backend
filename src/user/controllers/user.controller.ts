import {Body, Controller, Get, Param, Post, Put, ValidationPipe} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import { CreateUserDto, UpdateUserDto } from '../dtos';
import {UserService} from "../services/user.service";


@ApiTags('Users routes')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Get()
    async all() {
        const data = await this.userService.all();
        return {data};
    }
    @Post()
    async create(@Body() userCreate: CreateUserDto){
        const data = await this.userService.create(userCreate);
        return { message: 'User Register', data };
    }
    @Get(':id')
    async get(@Param('id') id: number){
        const data = await this.userService.get(id);
        return { data }
    }
    @Put(':id')
    async update(@Body() user: UpdateUserDto, @Param('id') id: number) {
        const data =  await  this.userService.update(id,user);
        return  { message: 'User Updated', data };
    }
    @Put(':id')
    async delete(@Param('id') id: number) {
        const data =  await this.userService.delete(id);
        return { message: 'User deleted', data };
    }

}
