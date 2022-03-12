import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, MaxLength,  Min,  MinLength} from "class-validator";

export class CreateRolDto {
    @ApiProperty({required: true})
    @MaxLength(255, {
        message: 'El máximo permitido es de 255 caracteres',
      })
    @MinLength(3 , {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    readonly name: string;

    @ApiProperty({required: false})
    @MaxLength(255, {
        message: 'El máximo permitido es de 20 caracteres',
      })   
    @IsOptional()
    readonly description: string;


    @ApiProperty({required: true})
    @IsArray()
    readonly permission: [];

}
