import { ApiProperty } from '@nestjs/swagger';
import { MaxLength,  MinLength} from "class-validator";


export class CreateRoomDto {
    @ApiProperty({required: true})
    @MaxLength(150, {
        message: 'El máximo permitido es de 150 caracteres',
      })
    @MinLength(3, {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    readonly name: string;


    @ApiProperty({required: false})
    readonly capacity: number;

    @ApiProperty({required: false})
    readonly height: number;

    @ApiProperty({required: false})
    readonly width: number;

    @ApiProperty({required: false})
    readonly length: number;
    
    @ApiProperty({required: false})
    readonly session: [];

    @ApiProperty({required: false})
    readonly person: [];

    @ApiProperty({required: false})
    @MaxLength(150, {
        message: 'El máximo permitido es de 150 caracteres',
      })
    @MinLength(3, {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    readonly namePeripheral: string;
}

