import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsString, MaxLength,  MinLength} from "class-validator";

export class CreatePermissionDto {
    @ApiProperty({required: true})
    @MaxLength(12)
    @MinLength(3)
    readonly code: string;

    @IsString()
    @MaxLength(20)
    @MinLength(3)
    @ApiProperty({required: true})
    readonly type: string;

    @ApiProperty({required: false})
    readonly state: number;

}
