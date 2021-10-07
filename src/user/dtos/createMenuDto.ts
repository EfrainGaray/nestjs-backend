import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsInt, IsString, MaxLength,  MinLength} from "class-validator";

export class CreateMenuDto {
    @ApiProperty({required: true})
    @MaxLength(12)
    @MinLength(3)
    readonly code: string;

    @IsString()
    @MaxLength(100)
    @MinLength(3)
    @ApiProperty({required: true})
    readonly option: string;

    @IsString()
    @MaxLength(255)
    @MinLength(3)
    @ApiProperty({required: true})
    readonly link: string;


}
