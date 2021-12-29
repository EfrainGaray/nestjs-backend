import { ApiProperty } from '@nestjs/swagger';
import { Double } from 'typeorm';
export class CreateBioepidermiologicalParametersDto {

    @ApiProperty({required: true})
    readonly infection_posibility: number;

    @ApiProperty({required: false})
    readonly hospitalization_rate: number;

    @ApiProperty({required: false})
    readonly death_rate: number;

    @ApiProperty({required: false})
    readonly porcentage_inmunized_population: number;

    @ApiProperty({required: false})
    readonly decay_rate: number;

    @ApiProperty({required: false})
    readonly deposition_surfices: number;

}
