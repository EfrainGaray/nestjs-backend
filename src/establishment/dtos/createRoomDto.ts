import { ApiProperty } from '@nestjs/swagger';
import { IsArray, MaxLength,  MinLength} from "class-validator";
import { Person } from 'src/action/entities';
import { Double } from 'typeorm';
import { Session } from '../entities';

export class CreateRoomDto {
    @ApiProperty({required: true})
    @MaxLength(150)
    @MinLength(3)
    readonly name: string;


    @ApiProperty({required: false})
    readonly capacity: number;

    @ApiProperty({required: false})
    readonly height: number;

    @ApiProperty({required: false})
    readonly width: number;

    @ApiProperty({required: false})
    readonly length: number;
    
    @ApiProperty({required: false})
    readonly session: [];

    @ApiProperty({required: false})
    readonly person: [];
}

