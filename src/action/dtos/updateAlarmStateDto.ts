import { PartialType} from '@nestjs/swagger';
import { CreateAlarmStateDto} from '.';


export class UpdateAlarmStateDto extends PartialType(CreateAlarmStateDto)  {}
