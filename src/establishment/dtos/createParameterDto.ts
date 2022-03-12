import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';


export class CreateParameterDto {

    @ApiProperty({required: false})
    readonly persons_with_mask: number;

    @ApiProperty({required: false})
    readonly people_infected: number;

    @ApiProperty({required: false})
    readonly exhalation_rate: number;

    @ApiProperty({required: false})
    readonly respiratory_rate: number;

    @ApiProperty({required: false})
    readonly CO2_emission: number;

    @ApiProperty({required: false})
    readonly inhalation_efficiency: number;

    @ApiProperty({required: false})
    readonly exhalation_efficiency: number;

    @ApiProperty({required: true})
    readonly additional_measures: number;

    @ApiProperty({required: false})
    @MaxLength(150, {
        message: 'El máximo permitido es de 150 caracteres',
      })
    @MinLength(3, {
        message: 'El mínimo permitido es de 3 caracteres',
      })
    readonly sessionDate: string;
    

}
