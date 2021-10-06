import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRolDto } from '../dtos';
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
        return { message: 'User Register', data };
    }
}
