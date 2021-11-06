import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, MaxLength,  Min,  MinLength} from "class-validator";

export class CreateRolDto {
    @ApiProperty({required: true})
    @MaxLength(255)
    @MinLength(3)
    readonly name: string;

    @ApiProperty({required: false})
    @MaxLength(255)
    @MinLength(0)    
    @IsOptional()
    readonly description: string;


    @ApiProperty({required: true})
    @IsArray()
    readonly permission: [];

}
