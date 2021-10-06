import { PartialType} from '@nestjs/swagger';
import { CreateRolDto } from '.';

export class UpdateRolDto extends PartialType(CreateRolDto)  {}
