import { PartialType} from '@nestjs/swagger';
import { CreatePermissionDto } from '.';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto)  {}
