import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsString, MaxLength,  MinLength} from "class-validator";
import { Double } from 'typeorm';

export class CreateEstablishmentDto {
    @ApiProperty({required: true})
    @MaxLength(150, {
        message: 'El máximo permitido es de 150 caracteres',
      })
    @MinLength(3, {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    readonly name: string;

    @IsString()
    @MaxLength(150, {
        message: 'El máximo permitido es de 150 caracteres',
      })
    @MinLength(6, {
        message: 'El mínimo permitido es de 6 caracteres',
      })
    @ApiProperty({required: true})
    readonly address: string;

    @IsString()
    @MaxLength(15, {
        message: 'El máximo permitido es de 15 caracteres',
      })
    @MinLength(3, {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    @ApiProperty({required: false})
    readonly category: string;

    @MaxLength(255, {
        message: 'El máximo permitido es de 255 caracteres',
      })
    @MinLength(3, {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    //@IsEmail()
    @ApiProperty({required: true})
    readonly business_name: string;

    @IsString()
    @MaxLength(15, {
        message: 'El máximo permitido es de 15 caracteres',
      })
    @MinLength(10, {
        message: 'El mínimo permitido es de 10 caracteres',
      })
    @ApiProperty({required: true})
    readonly rut: string;

    @ApiProperty({required: false})
    readonly latitude: Double;

    @ApiProperty({required: false})
    readonly longitude: Double;


}
