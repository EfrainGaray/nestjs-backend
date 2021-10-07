import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuDto } from '../dtos/createMenuDto';
import { UpdateMenuDto } from '../dtos/updateMenuDto';
import { Menu } from '../entities';

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>
    ) {}

    async all(): Promise<Menu[]> {
        const  menus = await this.menuRepository.find({  })
        return menus;
    }

    async get(id: number): Promise<Menu>{
        const menu = await this.menuRepository.findOne(id);
        if (!menu) throw new NotFoundException('Menu does not exists')

        return  menu;
    }

    async update(id: number,dto: UpdateMenuDto): Promise<Menu>{
        const menu = await this.get(id);

        if(menu.code != dto.code){
            const menuExist = await this.menuRepository.findOne({ code: dto.code });
        if (menuExist) throw new BadRequestException('Code Menu is already used');
        }
        
        const editedMenu = Object.assign(menu, dto);
        return await this.menuRepository.save(editedMenu);
    }

    async create(dto: CreateMenuDto): Promise<Menu> {
        const menuExist = await this.menuRepository.findOne({ code: dto.code });
        if (menuExist) throw new BadRequestException('Menu already registered');

        const newMenu = this.menuRepository.create(dto)
        const  menu = await this.menuRepository.save(newMenu)

        return menu;
    }

    async delete(id: number): Promise<Menu>{
        const menu = await this.get(id);
        if (!menu) throw new NotFoundException('Menu does not exists')
        return await this.menuRepository.remove(menu);
    }
}
