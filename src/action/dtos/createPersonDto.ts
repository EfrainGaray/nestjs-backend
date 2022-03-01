import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength,  MinLength} from "class-validator";

export class CreatePersonDto {
    @ApiProperty({required: true})
    @MaxLength(15)
    @MinLength(10)
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
    @IsEmail()
    readonly email: string;

    @ApiProperty({required: false})
    @MaxLength(150)
    @MinLength(3)
    readonly nameRoom: string;
}
