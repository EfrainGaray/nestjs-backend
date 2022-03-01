import { ApiProperty } from '@nestjs/swagger';
import { MaxLength,  MinLength} from "class-validator";


export class CreateAlarmStateDto {
    @ApiProperty({required: true})
    @MaxLength(255)
    @MinLength(3)
    readonly value: string;
    
    @ApiProperty({required: false})
    readonly date: string;


    @ApiProperty({required: false})
    @MaxLength(150)
    @MinLength(3)
    readonly personRut: string;
}
