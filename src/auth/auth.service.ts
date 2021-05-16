import { Injectable } from '@nestjs/common';
import { compare } from "bcrypt";
import { UserService } from "../user/user.service";
import {User} from "../user/entities";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findByEmail({email});
        if (user && (await compare(pass, user.password))) {
            const { password, ...rest } = user;
            return rest;
        }
        return null;
    }
    login(user: User) {
        const { id, ...rest } = user;
        const payload = { sub: id };

        return {
            user
        };
    }
}
