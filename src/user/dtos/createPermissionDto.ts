import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsString, MaxLength,  MinLength} from "class-validator";

export class CreatePermissionDto {
    @ApiProperty({required: true})
    @MaxLength(12, {
        message: 'El máximo permitido es de 12 caracteres',
      })
    @MinLength(3, {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    readonly code: string;

    @IsString()
    @MaxLength(20, {
        message: 'El máximo permitido es de 20 caracteres',
      })
    @MinLength(3, {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    @ApiProperty({required: true})
    readonly type: string;

    @ApiProperty({required: false})
    readonly state: number;

}
