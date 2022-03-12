import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsInt, IsString, MaxLength,  MinLength} from "class-validator";

export class CreateMenuDto {
    @ApiProperty({required: true})
    @MaxLength(12, {
        message: 'El máximo permitido es de 12 caracteres',
      })
    @MinLength(3, {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    readonly code: string;

    @IsString()
    @MaxLength(100, {
        message: 'El máximo permitido es de 100 caracteres',
      })
    @MinLength(3, {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    @ApiProperty({required: true})
    readonly option: string;

    @IsString()
    @MaxLength(255, {
        message: 'El máximo permitido es de 255 caracteres',
      })
    @MinLength(3, {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    @ApiProperty({required: true})
    readonly link: string;


}
