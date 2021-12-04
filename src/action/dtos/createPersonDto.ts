import { ApiProperty } from '@nestjs/swagger';
import { MaxLength,  MinLength} from "class-validator";

export class CreatePersonDto {
    @ApiProperty({required: true})
    @MaxLength(15)
    @MinLength(15)
    readonly rut: string;
    
    @ApiProperty({required: true})
    @MaxLength(150)
    @MinLength(3)
    readonly name: string;

    @ApiProperty({required: false})
    @MaxLength(150)
    @MinLength(3)
    readonly primaryLastName: string;

    @ApiProperty({required: false})
    @MaxLength(150)
    @MinLength(3)
    readonly secondLastName: string;

    @ApiProperty({required: false})
    @MaxLength(150)
    @MinLength(3)
    readonly email: string;

    @ApiProperty({required: false})
    readonly roomId: number;
}
