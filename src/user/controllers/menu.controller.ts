import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMenuDto } from '../dtos/createMenuDto';
import { UpdateMenuDto } from '../dtos/updateMenuDto';
import { MenuService } from '../services';

@ApiTags('Menus routes')
@Controller('menu')
export class MenuController {
    constructor( 
        private menuService: MenuService
    ){}

    @Get()
    async all() {
        const data = await this.menuService.all();
        return {data};
    }

    @Get(':id')
    async get(@Param('id') id: number){
        const data = await this.menuService.get(id);
        return { data }
    }

    @Put(':id')
    async update(@Body() rol: UpdateMenuDto, @Param('id') id: number) {
        const data =  await  this.menuService.update(id,rol);
        return  { message: 'Menu Updated', data };
    }

    @Post()
    async create(@Body() menuCreate: CreateMenuDto){
        const data = await this.menuService.create(menuCreate);
        return { message: 'Menu Registed', data };
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const data =  await this.menuService.delete(id);
        return { message: 'Menu deleted', data };
    }

}
