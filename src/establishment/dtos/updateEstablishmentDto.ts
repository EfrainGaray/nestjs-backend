
import { CreateEstablishmentDto } from '.';
import {PartialType} from "@nestjs/swagger";


export class UpdateEstablishmentDto extends PartialType(CreateEstablishmentDto)  {}
