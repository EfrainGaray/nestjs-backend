import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsString, MaxLength,  MinLength} from "class-validator";
import { Double, Timestamp } from 'typeorm';
import { Peripheral } from '../entities';

export class CreateBioepidermiologicalParametersDto {

    @ApiProperty({required: true})
    readonly infection_posibility: Double;

    @ApiProperty({required: false})
    readonly hospitalization_rate: Double;

    @ApiProperty({required: false})
    readonly death_rate: Double;

    @ApiProperty({required: false})
    readonly porcentage_inmunized_population: number;

    @ApiProperty({required: false})
    readonly decay_rate: Double;

    @ApiProperty({required: false})
    readonly deposition_surfices: Double;

}
