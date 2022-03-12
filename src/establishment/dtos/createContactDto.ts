import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsString, MaxLength,  MinLength} from "class-validator";

export class CreateContactDto {
    @ApiProperty({required: true})
    @MaxLength(150, {
        message: 'El máximo permitido es de 150 caracteres',
      })
    @MinLength(3, {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    readonly name: string;

    @MaxLength(150, {
        message: 'El máximo permitido es de 150 caracteres',
      })
    @MinLength(3, {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    @ApiProperty({required: true})
    readonly primaryLastName: string;

    @MaxLength(150, {
        message: 'El máximo permitido es de 150 caracteres',
      })
    @MinLength(3, {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    @ApiProperty({required: false})
    readonly secondLastName: string;

    @IsString()
    @MaxLength(150, {
        message: 'El máximo permitido es de 150 caracteres',
      })
    @MinLength(3, {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    @ApiProperty({required: true})
    readonly position: string;

    @IsString()
    @MaxLength(150, {
        message: 'El máximo permitido es de 150 caracteres',
      })
    @MinLength(3, {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    @ApiProperty({required: false})
    readonly email: string;

    @IsString()
    @MaxLength(15, {
        message: 'El máximo permitido es de 15 caracteres',
      })
    @MinLength(10, {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    @ApiProperty({required: true})
    rutEstablishment: string;

    
}
