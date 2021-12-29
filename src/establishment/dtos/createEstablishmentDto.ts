import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsString, MaxLength,  MinLength} from "class-validator";
import { Double } from 'typeorm';

export class CreateEstablishmentDto {
    @ApiProperty({required: true})
    @MaxLength(150)
    @MinLength(3)
    readonly name: string;

    @IsString()
    @MaxLength(150)
    @MinLength(6)
    @ApiProperty({required: true})
    readonly address: string;

    @IsString()
    @MaxLength(15)
    @MinLength(3)
    @ApiProperty({required: false})
    readonly category: string;

    @MaxLength(255)
    @MinLength(3)
    //@IsEmail()
    @ApiProperty({required: true})
    readonly business_name: string;

    @IsString()
    @MaxLength(15)
    @MinLength(10)
    @ApiProperty({required: true})
    readonly rut: string;

    @ApiProperty({required: false})
    readonly latitude: Double;

    @ApiProperty({required: false})
    readonly longitude: Double;


}
