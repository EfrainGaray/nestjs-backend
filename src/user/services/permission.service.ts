import {  BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto, UpdatePermissionDto } from '../dtos';
import { Permission } from '../entities';

@Injectable()
export class PermissionService {


    constructor(
        @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>
    ){

    }

    async all(): Promise<Permission[]> {
        const permissions = await this.permissionRepository.find({ })
        return permissions;
    }

    async get(id: number): Promise<Permission>{
        const permission = await this.permissionRepository.findOne(id);
        if (!permission) throw new NotFoundException('Permission does not exists')


        return  permission;
    }

    async create(dto: CreatePermissionDto): Promise<Permission> {
        const permissionExist = await this.permissionRepository.findOne({ code: dto.code });
        if (permissionExist) throw new BadRequestException('Permission already registered with code');

        const newPermission = this.permissionRepository.create(dto)
        const  permission = await this.permissionRepository.save(newPermission)

        return permission;
    }

    async delete(id: number): Promise<Permission>{
        const permission = await this.get(id);
        if (!permission) throw new NotFoundException('Permission does not exists')
        return await this.permissionRepository.remove(permission);
    }

    async update(id: number,dto: UpdatePermissionDto): Promise<Permission>{
        const permission = await this.get(id);

        if(permission.code != dto.code){
            const permissionExist = await this.permissionRepository.findOne({ code: dto.code });
        if (permissionExist) throw new BadRequestException('Code permission is already used');
        }
        
        const editedPermission = Object.assign(permission, dto);
        return await this.permissionRepository.save(editedPermission);
    }

}
