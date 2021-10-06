import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsString, MaxLength,  MinLength} from "class-validator";

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

    @MaxLength(150)
    @MinLength(3)
    @ApiProperty({required: true})
    readonly primaryLastName: string;
}
