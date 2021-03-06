import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email', // 'username'
            passwordField: 'password' // 'password'
        });
    }
    async validate(email: string, password: string){
        const user = this.authService.validateUser(email,password);
        if (!user)
            throw new UnauthorizedException('Login user or password does not match.');
        return user;
    }
}