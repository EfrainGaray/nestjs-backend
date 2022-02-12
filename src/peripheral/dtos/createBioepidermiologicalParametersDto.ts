import { ApiProperty } from '@nestjs/swagger';
export class CreateBioepidermiologicalParametersDto {

    @ApiProperty({required: true})
    readonly infection_posibility: number;

    @ApiProperty({required: false})
    readonly hospitalization_rate: number;

    @ApiProperty({required: false})
    readonly death_rate: number;

    @ApiProperty({required: false})
    readonly porcentage_immunized_population: number;

    @ApiProperty({required: false})
    readonly decay_rate: number;

    @ApiProperty({required: false})
    readonly deposition_surficies: number;

}
