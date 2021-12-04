import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsString, MaxLength,  MinLength} from "class-validator";
import { Timestamp } from 'typeorm';

export class CreateMitigatingActionDto {
    @ApiProperty({required: true})
    @MaxLength(150)
    @MinLength(3)
    readonly name: string;

    @ApiProperty({required: false})
    @MaxLength(100)
    @MinLength(3)
    readonly type: string;
    
    @ApiProperty({required: false})
    @MaxLength(255)
    @MinLength(3)
    readonly steps: string;

    @ApiProperty({required: false})
    readonly personId: number;

}
