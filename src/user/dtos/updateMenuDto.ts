import { PartialType} from '@nestjs/swagger';
import { CreateMenuDto } from './createMenuDto';


export class UpdateMenuDto extends PartialType(CreateMenuDto)  {}
