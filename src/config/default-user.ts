import { getRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import {User} from "../user/entities";
import {DEFAULT_USER_EMAIL, DEFAULT_USER_PASSWORD} from "./constants";

export const setDefaultUser = async (config: ConfigService) => {
    const userRepository = getRepository<User>(User);

    const defaultUser = await userRepository
        .createQueryBuilder()
        .where('email = :email', {
            email: config.get<string>('DEFAULT_USER_EMAIL'),
        })
        .getOne();

    if (!defaultUser) {
        const adminUser = userRepository.create({
            email: config.get<string>(DEFAULT_USER_EMAIL),
            password: config.get<string>(DEFAULT_USER_PASSWORD),
            name: 'ADMIN',
            roles: ['ADMIN'],
        });

        return await userRepository.save(adminUser);
    }
};