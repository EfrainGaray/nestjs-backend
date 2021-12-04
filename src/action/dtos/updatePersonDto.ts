import { PartialType} from '@nestjs/swagger';
import { CreatePersonDto} from '.';


export class UpdatePersonDto extends PartialType(CreatePersonDto)  {}
