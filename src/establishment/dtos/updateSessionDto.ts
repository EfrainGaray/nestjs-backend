import { PartialType} from '@nestjs/swagger';
import { CreateSessionDto } from '.';


export class UpdateSessionDto extends PartialType(CreateSessionDto)  {}
