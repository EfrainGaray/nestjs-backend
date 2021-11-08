import { PartialType} from '@nestjs/swagger';
import { CreateBioepidermiologicalParametersDto } from '.';


export class updateBioepidermiologicalParametersDto extends PartialType(CreateBioepidermiologicalParametersDto)  {}
