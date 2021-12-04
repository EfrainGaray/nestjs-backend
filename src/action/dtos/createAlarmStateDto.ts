import { ApiProperty } from '@nestjs/swagger';
import { MaxLength,  MinLength} from "class-validator";
import { Timestamp } from 'typeorm';

export class CreateAlarmStateDto {
    @ApiProperty({required: true})
    @MaxLength(255)
    @MinLength(3)
    readonly value: string;
    
    @ApiProperty({required: false})
    readonly date: Timestamp;


    @ApiProperty({required: false})
    readonly personId: number;
}
