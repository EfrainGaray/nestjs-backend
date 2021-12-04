import { PartialType} from '@nestjs/swagger';
import { CreateMitigatingActionDto} from '.';


export class UpdateMitigatingActionDto extends PartialType(CreateMitigatingActionDto)  {}
