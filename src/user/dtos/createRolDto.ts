import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsInt, IsString, MaxLength,  MinLength} from "class-validator";

export class CreateRolDto {
    @ApiProperty({required: true})
    @MaxLength(255)
    @MinLength(3)
    readonly name: string;

    @ApiProperty({required: false})
    @MaxLength(255)
    @MinLength(0)
    readonly description: string;


}
