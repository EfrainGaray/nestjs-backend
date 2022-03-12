import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsString, MaxLength,  MinLength, Validate} from "class-validator";
import { IsRut } from '../validators/rut';

export class CreateUserDto {
    @ApiProperty({required: true})
    @MaxLength(255, {
        message: 'El máximo permitido es de 255 caracteres',
      })
    @MinLength(6, {
      message: 'El mínimo permitido es de 255 caracteres',
    })
    readonly name: string;

    @IsString()
    @MaxLength(255, {
        message: 'El máximo permitido es de 255 caracteres',
      })
    @MinLength(6, {
        message: 'El mínimo permitido es de 6 caracteres',
      })
    @ApiProperty({required: true})
    readonly password: string;

    @IsString()
    @Validate(IsRut)
    @ApiProperty({required: true})
    readonly rut: string;

    @MaxLength(255, {
        message: 'El máximo permitido es de 255 caracteres',
      })
    @IsEmail()
    @ApiProperty({required: true})
    readonly email: string;

    @MaxLength(150, {
        message: 'El máximo permitido es de 150 caracteres',
      })
    @MinLength(3, {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    @ApiProperty({required: true})
    readonly primaryLastName: string;

    @ApiProperty({required: true})
    rol: string;
 
    @ApiProperty({required: false})
    readonly state: number;

    @IsString()
    @ApiProperty({required: true})
    rutEstablishment: string;

    @ApiProperty({required: false})
    @MaxLength(255, {
        message: 'El máximo permitido es de 255 caracteres',
      })
    readonly namePeripheral: string;

    @MaxLength(150, {
        message: 'El máximo permitido es de 150 caracteres',
      })
    @MinLength(3, {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    @ApiProperty({required: false})
    readonly secondLastName: string;
}
