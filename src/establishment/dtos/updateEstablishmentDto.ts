import { PartialType} from '@nestjs/swagger';
import { CreateEstablishmentDto } from '.';


export class UpdateEstablishmentDto extends PartialType(CreateEstablishmentDto)  {}
