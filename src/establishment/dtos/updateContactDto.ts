import { PartialType} from '@nestjs/swagger';
import { CreateContactDto } from '.';


export class UpdateContactDto extends PartialType(CreateContactDto)  {}
