import { ApiProperty } from '@nestjs/swagger';
import { MaxLength,  MinLength} from "class-validator";
import { Double } from 'typeorm';

export class CreateEnviromentalParameterDto {

    @ApiProperty({required: false})
    @MaxLength(50)
    @MinLength(3)
    readonly date_time: string;

    @ApiProperty({required: false})
    readonly relative_humidity: Double;

    @ApiProperty({required: false})
    readonly temperature: Double;

    @ApiProperty({required: false})
    readonly pressure: Double;

    @ApiProperty({required: false})
    readonly CO2: Double;

    @ApiProperty({required: false})
    @MaxLength(50)
    @MinLength(3)
    readonly CO2_alarm: string;

    @ApiProperty({required: false})
    readonly algorithm_result: Double;

    @ApiProperty({required: false})
    readonly SPG40_voc_index: Double;

    @ApiProperty({required: false})
    readonly SPG40_emp: Double;

    @ApiProperty({required: false})
    @MaxLength(50)
    @MinLength(3)
    readonly SPG40_hr: string;
    
    @ApiProperty({required: false})
    @MaxLength(50)
    @MinLength(3)
    readonly namePeripheral: string
}
