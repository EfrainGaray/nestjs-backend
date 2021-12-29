import { ApiProperty } from '@nestjs/swagger';
import { MaxLength,  MinLength} from "class-validator";
import { Double } from 'typeorm';
import { Peripheral } from '../entities';

export class CreateEnviromentalParameterDto {

    @MaxLength(50)
    @MinLength(3)
    //@ApiProperty({required: false})
    readonly date_time: string;

    //@ApiProperty({required: false})
    readonly relative_humidity: Double;

    //@ApiProperty({required: false})
    readonly temperature: Double;

    //@ApiProperty({required: false})
    readonly pressure: Double;

   // @ApiProperty({required: false})
    readonly CO2: Double;

    @MaxLength(50)
    @MinLength(3)
    //@ApiProperty({required: false})
    readonly CO2_alarm: string;

    //@ApiProperty({required: false})
    readonly algorithm_result: Double;

    //@ApiProperty({required: false})
    readonly SPG40_voc_index: Double;

   // @ApiProperty({required: false})
    readonly SPG40_emp: Double;

    //@MaxLength(50)
    //@MinLength(3)
    //@ApiProperty({required: false})
    readonly SPG40_hr: string;
    
    //@ApiProperty({required: false})
    readonly parameter: Peripheral[]
}
