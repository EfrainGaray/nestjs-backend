import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dtos/login.dto";
import { User } from "../common/decorators";
import { User as UserEntity } from 'src/user/entities';

@ApiTags('Auth routes')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() loginDto: LoginDto, @User() user: UserEntity) {
        const data = await this.authService.login(user);
        return {
            message: 'Login exitoso',
            data,
        };
    }

    @Get('profile')
    profile(){
       return 'Estos son tus datos';
    }
}
