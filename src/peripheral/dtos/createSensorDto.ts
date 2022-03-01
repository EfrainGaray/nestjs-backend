import { ApiProperty } from '@nestjs/swagger';
import { MaxLength,  MinLength} from "class-validator";

export class CreateSensorDto {
    @ApiProperty({required: true})
    @MaxLength(150)
    @MinLength(3)
    readonly name: string;

    @ApiProperty({required: false})
    @MaxLength(150)
    @MinLength(3)
    readonly namePeripheral: string;
    
}
