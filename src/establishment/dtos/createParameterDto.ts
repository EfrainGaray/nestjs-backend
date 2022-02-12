import { ApiProperty } from '@nestjs/swagger';


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

}
