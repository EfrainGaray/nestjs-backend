import { ApiProperty } from '@nestjs/swagger';
import { MaxLength,  MinLength} from "class-validator";
import { Timestamp } from 'typeorm';

export class CreateProcessDto {
    @ApiProperty({required: true})
    @MaxLength(15, {
        message: 'El máximo permitido es de 15 caracteres',
      })
    @MinLength(10, {
        message: 'El mínimo permitido es de 10 caracteres',
      })
    readonly rut_person: string;

    @ApiProperty({required: false})
    readonly type: number;
    
    @ApiProperty({required: false})
    @MaxLength(255, {
        message: 'El máximo permitido es de 255 caracteres',
      })
    @MinLength(3, {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    readonly steps: string;

    @ApiProperty({required: false})
    readonly created_at: Timestamp;

    @ApiProperty({required: false})
    readonly updated_at: Timestamp;

    @ApiProperty({required: false})
    @MaxLength(255, {
        message: 'El máximo permitido es de 255 caracteres',
      })
    @MinLength(3, {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    readonly enviromentParameterDate: string;

    @ApiProperty({required: false})
    @MaxLength(255, {
        message: 'El máximo permitido es de 150 caracteres',
      })
    @MinLength(3, {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    readonly mitigatingActionName: string;
}
