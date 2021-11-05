import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsString, MaxLength,  MinLength} from "class-validator";

export class CreateRoomDto {
    @ApiProperty({required: true})
    @MaxLength(150)
    @MinLength(3)
    readonly name: string;

    @MaxLength(150)
    @MinLength(3)
    @ApiProperty({required: true})
    readonly primaryLastName: string;

    @MaxLength(150)
    @MinLength(3)
    @ApiProperty({required: false})
    readonly secondLastName: string;

    @IsString()
    @MaxLength(150)
    @MinLength(3)
    @ApiProperty({required: true})
    readonly position: string;

    @IsString()
    @MaxLength(15)
    @MinLength(3)
    @ApiProperty({required: false})
    readonly email: string;



    
}
