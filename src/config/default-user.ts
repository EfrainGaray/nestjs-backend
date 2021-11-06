import { getRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User, Rol, Menu, SubMenu, Permission, RolPermissionMenu,  } from "../user/entities";
import { 
    DEFAULT_ROL_DESCRIPTION, 
    DEFAULT_ROL_NAME, 
    DEFAULT_USER_EMAIL, 
    DEFAULT_USER_NAME, 
    DEFAULT_USER_PASSWORD, 
    DEFAULT_USER_PRIMARY_LAST_NAME, 
    DEFAULT_USER_RUT, 
    DEFAULT_USER_SECOND_LAST_NAME, 
    DEFAULT_USER_STATE 
} from "./constants";

export const setDefaultUser = async (config: ConfigService) => {
    const userRepository = getRepository<User>(User);
    const rolRepository = getRepository<Rol>(Rol);
    const menuRepository = getRepository<Menu>(Menu);
    const permissionMenuRepository = getRepository<Permission>(Permission);
    const rolPermissionMenu = getRepository<RolPermissionMenu>(RolPermissionMenu);

    const defaultUser = await userRepository
        .createQueryBuilder()
        .where('email = :email', {
            email: config.get<string>('DEFAULT_USER_EMAIL'),
        })
        .getOne();




    if (!defaultUser) {
     
    
        /*
        const subMenuRepository = getRepository<SubMenu>(SubMenu);
        const subm001 =  subMenuRepository.create(
            {
                code: 'SUBM-001',
                option: 'Ver',
                level: 1,
            }
        );
        await subMenuRepository.save(subm001);
    
        const subm002 =  subMenuRepository.create(
            {
                code: 'SUBM-002',
                option: 'Editar',
                level: 2,
            }
        );
        await subMenuRepository.save(subm002);
    
        const subm003 =  subMenuRepository.create(
            {
                code: 'SUBM-003',
                option: 'Eliminar',
                level: 2,
            }
        );
        
        const subm004 =  subMenuRepository.create(
            {
                code: 'SUBM-004',
                option: 'Crear',
                level: 1,
            }
        );
      
        await subMenuRepository.save(subm004);
        */
        const mpr001 =  menuRepository.create(
            {
                code: 'MPR-001',
                option: 'Perfil',
                link: '/profile',
            }
            );
        await menuRepository.save(mpr001);
    
        const mpr002 =  menuRepository.create(
        {
            code: 'MPR-002',
            option: 'Usuarios',
            link: '/users',
        }
        );
        await menuRepository.save(mpr002);
    
        const mpr003 =  menuRepository.create(
            {
                code: 'MPR-003',
                option: 'Establesimientos',
                link: '/establishments',
            }
            );
        await menuRepository.save(mpr003);
    
        
        const mpr004 =  menuRepository.create(
            {
                code: 'MPR-004',
                option: 'Perifericos',
                link: '/peripherals',
            }
        );
        await menuRepository.save(mpr004);
        const mpr005 =  menuRepository.create(
            {
                code: 'MPR-005',
                option: 'Salas',
                link: '/rooms',
            }
        );
        await menuRepository.save(mpr005);
    
        const mpr006 =  menuRepository.create(
            {
                code: 'MPR-006',
                option: 'Configuracion',
                link: '/config',
            }
        );
        await menuRepository.save(mpr006);
        
        const p001 =  permissionMenuRepository.create(
            {
                code: 'R-001',
                type: 'Leer',
                state:1,
              //  menu:[mpr001, mpr002, mpr003, mpr004, mpr005, mpr006]
            }
        );
        await permissionMenuRepository.save(p001);
    
        const p002 =  permissionMenuRepository.create(
            {
                code: 'W-001',
                type: 'Escribir',
                state:1,
               // menu:[mpr001,mpr002,mpr003,mpr004,mpr005]
            }
        );
        await permissionMenuRepository.save(p002);
    
        const p003 =  permissionMenuRepository.create(
            {
                code: 'U-001',
                type: 'Editar',
                state:1,
              //  menu:[mpr001,mpr002,mpr003,mpr004,mpr005]
            }
        );
        await permissionMenuRepository.save(p003);
        const p004 =  permissionMenuRepository.create(
            {
                code: 'C-001',
                type: 'Crear',
                state:1,
                //menu:[mpr001,mpr002,mpr003,mpr004,mpr005]
            }
        );
        await permissionMenuRepository.save(p004);
    
    
        const p005 =  permissionMenuRepository.create(
            {
                code: 'D-001',
                type: 'Eliminar',
                state:1,
                //menu:[mpr001,mpr002,mpr003,mpr004,mpr005]
            }
        );
    
        await permissionMenuRepository.save(p005);
        
        const adminRol = rolRepository.create({
            name : config.get<string>(DEFAULT_ROL_NAME),
            description: config.get<string>(DEFAULT_ROL_DESCRIPTION),
          //  permission:[p001, p002, p003, p004, p005]
        });

        await rolRepository.save(adminRol);


        const adminUser = userRepository.create({
            email: config.get<string>(DEFAULT_USER_EMAIL),
            password: config.get<string>(DEFAULT_USER_PASSWORD),
            state: config.get<number>(DEFAULT_USER_STATE),
            name: config.get<string>(DEFAULT_USER_NAME),
            primaryLastName: config.get<string>(DEFAULT_USER_PRIMARY_LAST_NAME),
            secondLastName: config.get<string>(DEFAULT_USER_SECOND_LAST_NAME),    
            rut:config.get<string>(DEFAULT_USER_RUT),
            rol:[adminRol]
        });
        for(let x = 1; x<=5;x++){
            for(let i = 1; i<=6;i++){
                const rolP =  rolPermissionMenu.create({
                    permissionId: x,
                    menuId: i,
                    rolId: 1
                });
                rolPermissionMenu.save(rolP);
            }
           
        }
        

        return await userRepository.save(adminUser);
    }
};