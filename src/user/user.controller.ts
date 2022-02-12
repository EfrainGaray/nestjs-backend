import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";

import {Auth, User} from "../common/decorators";
import {AppResource, AppRoles} from "../app.roles";
import {InjectRolesBuilder, RolesBuilder} from "nest-access-control";
import {User as UserEntity} from './entities'
import { UserRegistrationDto } from './dtos/user-registration.dto';
import { UpdateUserDto } from './dtos';

@ApiTags('Users routes')
@Controller('user')
export class UserController {
    constructor(
                private userService: UserService,
                @InjectRolesBuilder()
                private readonly rolesBuilder: RolesBuilder,
                ) {}


    @Auth({
        possession: 'any',
        action: 'read',
        resource: AppResource.USER,
    })
    @Get()
    async all() {
        const data = await this.userService.all();
        return {data};
    }

    @Auth({
        possession: 'any',
        action: 'create',
        resource: AppResource.USER,
    })
    @Post()
    async create(@Body() dto: UserRegistrationDto){
        const data = await this.userService.create({
            ...dto,
            roles: [AppRoles.AUTHOR],
        });
        return { message: 'User registered', data };
    }
    @Auth({
        possession: 'any',
        action: 'read',
        resource: AppResource.USER,
    })
    @Get(':id')
    async get(@Param('id') id: number){
        const data = await this.userService.get(id);
        return { data }
    }

    @Auth({
        possession: 'own',
        action: 'update',
        resource: AppResource.USER,
    })
    @Put(':id')
    async update(
            @User() user: UserEntity,
            @Body() dto: UpdateUserDto,
            @Param('id') id: number) {

        let data;

        if (this.rolesBuilder.can(user.roles).updateAny(AppResource.USER).granted) {
            data = await this.userService.update(id, dto);
        } else {
            data = await this.userService.update(id, dto, user);
        }
        return { message: 'User edited', data };
    }

    @Auth({
        possession: 'any',
        action: 'delete',
        resource: AppResource.USER,
    })
    @Delete(':id')
    async delete(@Param('id') id: number) {
        const data =  await this.userService.delete(id);
        return { message: 'User deleted', data };
    }

}
