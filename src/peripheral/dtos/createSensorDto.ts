import { ApiProperty } from '@nestjs/swagger';
import { MaxLength,  MinLength} from "class-validator";

export class CreateSensorDto {
    @ApiProperty({required: true})
    @MaxLength(150, {
        message: 'El máximo permitido es de 150 caracteres',
      })
    @MinLength(3, {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    readonly name: string;

    @ApiProperty({required: false})
    @MaxLength(150, {
        message: 'El máximo permitido es de 150 caracteres',
      })
    @MinLength(3, {
        message: 'El mpinimo permitido es de 3 caracteres',
      })
    readonly namePeripheral: string;
    
}
