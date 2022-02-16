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

    @IsString()
    @MaxLength(15)
    @MinLength(10)
    @ApiProperty({required: true})
    readonly rut: string;

    @MaxLength(255)
    @IsEmail()
    @ApiProperty({required: true})
    readonly email: string;

    @MaxLength(150)
    @MinLength(3)
    @ApiProperty({required: true})
    readonly primaryLastName: string;

    @MaxLength(15)
    @MinLength(3)
    @ApiProperty({required: true})
    rol: string;
 
    @ApiProperty({required: false})
    readonly state: number;

    @IsString()
    @MaxLength(15)
    @MinLength(10)
    @ApiProperty({required: true})
    rutEstablishment: string;

    @ApiProperty({required: false})
    @MaxLength(255)
    readonly namePeripheral: string;

    @MaxLength(150)
    @MinLength(3)
    @ApiProperty({required: false})
    readonly secondLastName: string;
}
