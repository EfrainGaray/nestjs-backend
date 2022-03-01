import { ApiProperty } from '@nestjs/swagger';
import { MaxLength,  MinLength} from "class-validator";


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

    @ApiProperty({required: false})
    @MaxLength(150)
    @MinLength(3)
    readonly namePeripheral: string;
}

