import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength,  MinLength} from "class-validator";
import { Double, Timestamp } from 'typeorm';

export class CreateSessionDto {

    @ApiProperty({required: true})
    readonly date: Timestamp;

    @ApiProperty({required: false})
    readonly duration: number;

    @ApiProperty({required: false})
    readonly background_CO2: Double;

    @ApiProperty({required: false})
    readonly exterior_ventilation: number;

    @ApiProperty({required: false})
    readonly event_repeats: number;

    @ApiProperty({required: false})
    readonly roomId: number;


    
}
