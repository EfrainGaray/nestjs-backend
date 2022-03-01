import { ApiProperty } from '@nestjs/swagger';
import { MaxLength,  MinLength} from "class-validator";


export class CreateMitigatingActionDto {
    @ApiProperty({required: true})
    @MaxLength(150)
    @MinLength(3)
    readonly name: string;

    @ApiProperty({required: false})
    @MaxLength(100)
    @MinLength(3)
    readonly type: string;

    @ApiProperty({required: false})
    @MaxLength(100)
    @MinLength(3)
    readonly personRut: string;

}
