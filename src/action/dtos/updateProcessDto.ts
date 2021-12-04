import { PartialType} from '@nestjs/swagger';
import { CreateProcessDto } from '.';


export class UpdateProcessDto extends PartialType(CreateProcessDto)  {}
