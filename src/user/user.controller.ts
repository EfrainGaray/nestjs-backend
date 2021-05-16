import {Body, Controller, Get, Param, Post, Put, ValidationPipe} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {UserService} from "./user.service";
import {CreateUserDto, UpdateUserDto} from "./dtos";

@ApiTags('Users routes')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Get()
    async all() {
        const data = this.userService.all();
        return {data};
    }
    @Post()
    async create(@Body(new ValidationPipe()) userCreate: CreateUserDto){
        const data = await this.userService.create(userCreate);
        delete data.password;
        return { message: 'User Register', data };
    }
    @Get(':id')
    async get(@Param('id') id: number){
        const data = this.userService.get(id);
        return { data }
    }
    @Put(':id')
    async update(@Body(new ValidationPipe()) user: UpdateUserDto, @Param('id') id: number) {
        return this.userService.update(id,user);
    }
    @Put(':id')
    async delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }

}
