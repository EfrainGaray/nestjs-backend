import {  Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePermissionDto, UpdatePermissionDto } from '../dtos';
import { PermissionService} from '../services';

@ApiTags('Permission Rol')
@Controller('permission')
export class PermissionController {
    constructor( 
        private permissionService: PermissionService
    ){}
    
    @Get()
    async all() {
        const data = await this.permissionService.all();
        return {data};
    }

    @Get(':id')
    async get(@Param('id') id: number){
        const data = await this.permissionService.get(id);
        return { data }
    }

    @Post()
    async create(@Body() permissionCreate: CreatePermissionDto){
        const data = await this.permissionService.create(permissionCreate);
        return { message: 'Permission Registed', data };
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const data =  await this.permissionService.delete(id);
        return { message: 'Permission deleted', data };
    }

    @Put(':id')
    async update(@Body() permission: UpdatePermissionDto, @Param('id') id: number) {
        const data =  await  this.permissionService.update(id,permission);
        return  { message: 'Permission Updated', data };
    }

}
