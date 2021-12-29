import { PartialType} from '@nestjs/swagger';
import { CreateSensorDto } from '.';


export class UpdateSensorDto extends PartialType(CreateSensorDto)  {}
