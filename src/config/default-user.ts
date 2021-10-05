import { getRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User, Rol, Permission } from "../user/entities";

import { DEFAULT_ROL_DESCRIPTION, DEFAULT_ROL_NAME, DEFAULT_USER_EMAIL, DEFAULT_USER_NAME, DEFAULT_USER_PASSWORD, DEFAULT_USER_PRIMARY_LAST_NAME, DEFAULT_USER_RUT, DEFAULT_USER_SECOND_LAST_NAME, DEFAULT_USER_STATE } from '.';

export const setDefaultUser = async (config: ConfigService) => {
    const userRepository = getRepository<User>(User);
    const rolRepository = getRepository<Rol>(Rol);


    const defaultUser = await userRepository
        .createQueryBuilder()
        .where('email = :email', {
            email: config.get<string>('DEFAULT_USER_EMAIL'),
        })
        .getOne();

    if (!defaultUser) {

        const adminRol = rolRepository.create({
           name : config.get<string>(DEFAULT_ROL_NAME),
           description: config.get<string>(DEFAULT_ROL_DESCRIPTION),
          
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
         return await userRepository.save(adminUser);
    }
};