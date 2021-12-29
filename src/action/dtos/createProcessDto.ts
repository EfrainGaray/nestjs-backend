import { ApiProperty } from '@nestjs/swagger';
import { MaxLength,  MinLength} from "class-validator";
import { Timestamp } from 'typeorm';

export class CreateProcessDto {
    @ApiProperty({required: true})
    @MaxLength(15)
    @MinLength(10)
    readonly rut_person: string;

    @ApiProperty({required: false})
    readonly type: number;
    
    @ApiProperty({required: false})
    @MaxLength(255)
    @MinLength(3)
    readonly steps: string;

    @ApiProperty({required: false})
    readonly created_at: Timestamp;

    @ApiProperty({required: false})
    readonly updated_at: Timestamp;

    @ApiProperty({required: false})
    readonly enviromentParameterId: number;

    @ApiProperty({required: false})
    readonly mitigatingActionId: number;
}
