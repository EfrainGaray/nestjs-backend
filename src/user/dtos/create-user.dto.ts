import { ApiProperty } from '@nestjs/swagger';
import {IsArray, IsEmail, IsEnum, IsOptional, IsString, MaxLength,  MinLength} from "class-validator";
import {AppRoles} from "../../app.roles";
import {EnumToString} from "../../common/helper";

export class CreateUserDto {
    @ApiProperty({required: true})
    @MaxLength(255)
    @MinLength(6)
    readonly name: string;

    @IsString()
    @MaxLength(255)
    @MinLength(6)
    @ApiProperty({required: true})
    readonly password: string;

    @MaxLength(255)
    @IsEmail()
    @ApiProperty({required: true})
    readonly email: string;

    @IsOptional()
    @ApiProperty({required: false})
    readonly avatar: string;

    @IsArray()
    @IsEnum(AppRoles, {
        each: true,
        message: `must be a valid role value, ${EnumToString(AppRoles)}`,
    })
    roles: string[];
}
