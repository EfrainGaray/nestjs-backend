import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength,  MinLength} from "class-validator";
import { Timestamp } from 'typeorm';

export class CreatePeripheralDto {
    @ApiProperty({required: true})
    @MaxLength(255)
    @MinLength(3)
    readonly ip: string;
    
    @ApiProperty({required: true})
    @MaxLength(255)
    @MinLength(3)
    readonly name: string;

    @IsString()
    @MaxLength(255)
    @MinLength(3)
    @ApiProperty({required: true})
    readonly localization: string;

    @ApiProperty({required: false})
    readonly state: number;

    @ApiProperty({required: true})
    readonly date_state: Timestamp;

    @ApiProperty({required: false})
    @MaxLength(150)
    @MinLength(3)
    readonly rutEstablishment: string;

}
