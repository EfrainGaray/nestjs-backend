import {ApiProperty} from "@nestjs/swagger";
import {MaxLength, MinLength, IsString, IsEmail} from "class-validator";

export class LoginDto {
    @MaxLength(255)
    @IsEmail()
    @ApiProperty({required: true})
    readonly email: string;

    @IsString()
    @MaxLength(255)
    @MinLength(6)
    @ApiProperty({required: true})
    readonly password: string;
}