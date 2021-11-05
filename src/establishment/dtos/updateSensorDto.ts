import { PartialType} from '@nestjs/swagger';
import { CreateContactDto, CreateSensorDto } from '.';


export class UpdateSensorDto extends PartialType(CreateSensorDto)  {}
