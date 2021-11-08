import { PartialType} from '@nestjs/swagger';
import { CreateParameterDto } from '.';


export class UpdateParameterDto extends PartialType(CreateParameterDto)  {}
