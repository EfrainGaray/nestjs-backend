import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { resolve } from 'path';
import { Repository } from 'typeorm';
import { CreateRolDto, UpdateRolDto } from '../dtos';
import { Menu, Permission, Rol, RolPermissionMenu } from '../entities';
import { MenuService } from './menu.service';
import { PermissionService } from './permission.service';

@Injectable()
export class RolService {
    
    constructor(
        @InjectRepository(Rol) private readonly rolRepository: Repository<Rol>,
        @InjectRepository(RolPermissionMenu) private readonly rolPermissionMenu: Repository<RolPermissionMenu>,
        public permissionService: PermissionService,
        public menuService: MenuService,
    ){

    }

    async all(): Promise<Rol[]> {
        const rols = await this.rolRepository.find({ relations:['rolPermissionMenu'] })
        return rols;
    }
    
    async getForCode(code: string): Promise<Rol>{
        const rol = await this.rolRepository.findOne({ name : code });
        return  rol;
    }

    async create(dto: CreateRolDto): Promise<Rol> {
        const permissions:Permission[] = [];
        const menus:Menu[] = [];
        const rolExist = await this.rolRepository.findOne({ name: dto.name });
        if(dto.permission){
            for await (const codPermission of dto.permission) {
                let MenuCods: Menu[];
                const permission = await this.permissionService.getForCode(codPermission['code']);
                if(permission){
                    permissions.push(permission);
                }
                MenuCods = codPermission['menu'];
                for await (const codeMenu of MenuCods) {
                    const menu = await this.menuService.getForCode(codeMenu['code']);
                    if(menu){
                        menus.push(menu);
                    }
                }
            }
        }
        if (!permissions.length) throw new BadRequestException('Permissions not created');
        if (!menus.length) throw new BadRequestException('Menu not created');
        if (rolExist) throw new BadRequestException('Rol already registered');
        
        

        const newRol = this.rolRepository.create(dto)
        const  rol = await this.rolRepository.save(newRol)
    
        for await (const codPermission of dto.permission) {
            let MenuCods: Menu[];
            const permission = await this.permissionService.getForCode(codPermission['code']);
            if(permission){
                MenuCods = codPermission['menu'];
                for await (const codeMenu of MenuCods) {
                    const menu = await this.menuService.getForCode(codeMenu['code']);
                    console.log(menu,permission,rol);
                    const rolPermissionMenu =  this.rolPermissionMenu.create({
                        permissionId: permission.id,
                        menuId:menu.id,
                        rolId: rol.id
                    });
                    await this.rolPermissionMenu.save(rolPermissionMenu)
                }
           
            }
        }
  
            
        
        

        return this.get(rol.id); 
    }
    async delete(id: number): Promise<Rol>{
        const rol = await this.get(id);
        if (!rol) throw new NotFoundException('Rol does not exists')
        return await this.rolRepository.remove(rol);
    }

    async get(id: number): Promise<Rol>{
        const rol = await this.rolRepository.findOne(id,{ relations:['rolPermissionMenu',] });
        if (!rol) throw new NotFoundException('Rol does not exists')


        return  rol;
    }

    async update(id: number,dto: UpdateRolDto): Promise<Rol>{
        const rol = await this.get(id);

        if(rol.name != dto.name){
            const rolExist = await this.rolRepository.findOne({ name: dto.name });
        if (rolExist) throw new BadRequestException('Name Rol is already used');
        }
        
        const editedRol = Object.assign(rol, dto);
        return await this.rolRepository.save(editedRol);
    }

}
