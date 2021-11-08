import { PartialType} from '@nestjs/swagger';
import { CreateEnviromentalParameterDto } from '.';


export class UpdateEnviromentalParameterDto extends PartialType(CreateEnviromentalParameterDto)  {}
