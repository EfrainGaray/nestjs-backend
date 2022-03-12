import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength,  MinLength} from "class-validator";
import { Timestamp } from 'typeorm';

export class CreatePeripheralDto {
    @ApiProperty({required: true})
    @MaxLength(255, {
        message: 'El máximo permitido es de 255 caracteres',
      })
    @MinLength(3, {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    readonly ip: string;
    
    @ApiProperty({required: true})
    @MaxLength(255, {
        message: 'El máximo permitido es de 255 caracteres',
      })
    @MinLength(3, {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    readonly name: string;

    @IsString()
    @MaxLength(255, {
        message: 'El máximo permitido es de 255 caracteres',
      })
    @MinLength(3, {
        message: 'El máximo permitido es de 3 caracteres',
      })
      
    @ApiProperty({required: true})
    readonly localization: string;

    @ApiProperty({required: false})
    readonly state: number;

    @ApiProperty({required: true})
    readonly date_state: Timestamp;

    @ApiProperty({required: false})
    @MaxLength(150, {
        message: 'El máximo permitido es de 150 caracteres',
      })
    @MinLength(3, {
        message: 'El máximo permitido es de 3 caracteres',
      })
    readonly rutEstablishment: string;

}
