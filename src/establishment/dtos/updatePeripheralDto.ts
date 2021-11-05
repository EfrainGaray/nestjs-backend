import { PartialType} from '@nestjs/swagger';
import { CreatePeripheralDto } from '.';


export class UpdatePeripheralDto extends PartialType(CreatePeripheralDto)  {}
