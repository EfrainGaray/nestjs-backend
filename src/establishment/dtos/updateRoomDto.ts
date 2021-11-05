import { PartialType} from '@nestjs/swagger';
import { CreateRoomDto } from '.';


export class UpdateRoomDto extends PartialType(CreateRoomDto)  {}
