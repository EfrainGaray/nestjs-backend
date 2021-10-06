import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRolDto, UpdateRolDto } from '../dtos';
import { Rol } from '../entities';
import { RolService } from '../services';

@ApiTags('Rol Users')
@Controller('rol')
export class RolController {
    constructor( 
        private roleService: RolService
    ){}
    
    @Get()
    async all() {
        const data = await this.roleService.all();
        return {data};
    }

    @Post()
    async create(@Body() rolCreate: CreateRolDto){
        const data = await this.roleService.create(rolCreate);
        return { message: 'Rol Register', data };
    }

    
    @Delete(':id')
    async delete(@Param('id') id: number) {
        const data =  await this.roleService.delete(id);
        return { message: 'User deleted', data };
    }

    @Put(':id')
    async update(@Body() rol: UpdateRolDto, @Param('id') id: number) {
        const data =  await  this.roleService.update(id,rol);
        return  { message: 'Rol Updated', data };
    }

    @Get(':id')
    async get(@Param('id') id: number){
        const data = await this.roleService.get(id);
        return { data }
    }
}
